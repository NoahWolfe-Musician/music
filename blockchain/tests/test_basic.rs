use solana_program_test::*;
use solana_sdk::{
    signature::Signer,
    transaction::Transaction,
};

#[tokio::test]
async fn test_basic() {
    
    
    let program_test = ProgramTest::new(
        "musicelvis",
        musicelvis::id(),
        None,
    );

    
    
    let (mut banks_client, payer, recent_blockhash) = program_test.start().await;

    
    
    assert!(true);
}