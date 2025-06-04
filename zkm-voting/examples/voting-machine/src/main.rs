use std::path::PathBuf;
use std::env;
use voting_machine::eth_client::{create_eth_client, load_contract};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let relative_path = PathBuf::from("artifacts/RiscZeroGroth16Verifier.json");
    let absolute_path = env::current_dir()
        .expect("Failed to get current directory")
        .join(&relative_path);

    println!("Absolute path: {}", absolute_path.display());

    let client = create_eth_client().await?;

    let contract = load_contract(
        client,
        "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    )
    .await?;

    let version = contract
        .version()
        .call()
        .await?;

    println!("VERSION: {}", version);

    Ok(())
}