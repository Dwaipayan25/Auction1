const hre = require("hardhat");

async function consoleAuctions(auctions){
  for(const auction of auctions){
    console.log(auction.AuctionId);
    console.log(auction.auctionStarter);
    console.log(auction.about);
    console.log(auction.startBidPrice);
    console.log(auction.highestBidder);
    console.log(auction.highestBid);
    console.log(auction.startTime);
    console.log(auction.auctionActive);
    console.log(auction.owner);
  }
}

async function main() {
  const [owner,bid1,bid2,bid3]= await hre.ethers.getSigners();
  const Auction = await hre.ethers.getContractFactory("auction");
  const auction = await Auction.deploy();
  await auction.deployed();
  console.log("Auction deployed to:", auction.address);

  const newAuction = await auction.connect(owner).startAuction("dwaipayan",100);
  await newAuction.wait();
  console.log("Auction started");
  const bidd1 = await auction.connect(bid1).bid(0,105);
  await bidd1.wait();
  console.log("Bid1 placed");
  const bidd2 = await auction.connect(bid2).bid(0,110);
  await bidd2.wait();
  console.log("Bid2 placed");
  const bidd3 = await auction.connect(bid3).bid(0,115);
  await bidd3.wait();
  console.log("Bid3 placed");
  const auctions=await auction.showAuctions();
  await consoleAuctions(auctions);
  
  const endAuction = await auction.connect(owner).endBid(0);
  await endAuction.wait();
  console.log("Auction ended");
  const buy = await auction.connect(bid3).PayToBuy(0,{value:"115"});
  await buy.wait();
  console.log("Auction bought");
  const auctions2=await auction.showAuctions();
  await consoleAuctions(auctions2);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//--network polygon
