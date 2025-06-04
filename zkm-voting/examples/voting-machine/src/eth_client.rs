use ethcontract::contract;
use ethcontract::dyns::DynTransport;
use ethcontract::web3::api::Web3;
use ethcontract::web3::transports::Http;
use ethcontract::web3::types::Address;
use std::str::FromStr;

pub type EthClient = Web3<DynTransport>;
contract!("artifacts/RiscZeroGroth16Verifier.json");

// Set environment here: "local", "sepolia", or "passet"
pub static ENV: &str = "sepolia";

pub fn get_env_config(env: &str) -> anyhow::Result<(&'static str, &'static str)> {
    match env {
        "local" => Ok((
            "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
            "http://127.0.0.1:8545",
        )),
        "sepolia" => Ok((
            "0xbF8b89C7E818fda93C947e8d15c17BA19535196f",
            "https://1rpc.io/sepolia",
        )),
        "passet" => Ok((
            "0xYourPassetContractAddressHere",
            "https://testnet-passet-hub-eth-rpc.polkadot.io",
        )),
        _ => anyhow::bail!("Unknown environment: {}", env),
    }
}

pub async fn create_eth_client() -> anyhow::Result<EthClient> {
    let (_, rpc_url) = get_env_config(ENV)?;
    let http = Http::new(rpc_url)?;
    Ok(Web3::new(DynTransport::new(http)))
}

pub async fn load_contract(
    web3: EthClient,
    contract_address: &str,
) -> anyhow::Result<RiscZeroGroth16Verifier> {
    let address = Address::from_str(contract_address)?;
    Ok(RiscZeroGroth16Verifier::at(&web3, address))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_version() -> anyhow::Result<()> {
        let (contract_address, _) = get_env_config(ENV)?;
        let client = create_eth_client().await?;
        let contract = load_contract(client, contract_address).await?;

        let version = contract.version().call().await?;
        println!("VERSION: {}", version);

        Ok(())
    }
}
