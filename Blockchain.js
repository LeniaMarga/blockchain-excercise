const SHA256 = require('crypto-js/sha256');
const Block = require('./Block.js');

// let Block = new Block();

class Blockchain{
   constructor(){
      this.chain = [this.createGenesisBlock()];
   }

   createGenesisBlock(){
      return new Block(0, "31/01/1989", "Genesis block", "0");
   }

   getLatestBlock(){
      return this.chain[this.chain.length -1];
   }

   addBlock(newBlock){
       newBlock.previousHash = this.getLatestBlock().hash;
       newBlock.hash= newBlock.calculateHash();
       this.chain.push(newBlock);
   }

   isChainValid(){
     for(let i=1; i<this.chain.length; i++){
       const currentBlock =this.chain[i];
       const previousBlock = this.chain[i-1];
       if (currentBlock.hash !== currentBlock.calculateHash()){
         return false;
       }
       if (currentBlock.previousHash !== previousBlock.hash){
         return false;
       }
     }
     return true;
   }

}


let leniaCoin = new Blockchain();
leniaCoin.addBlock(new Block(1, "30/01/1990", {amount: 4}));
leniaCoin.addBlock(new Block(2, "30/02/1980", {amount: 5}));
leniaCoin.addBlock(new Block(2, "30/02/1980", {amount: 10}));


console.log(JSON.stringify(leniaCoin, null, 4));
console.log("is blockchain valid? " + leniaCoin.isChainValid());

leniaCoin.chain[2].data = { amount: 100};
//leniaCoin.chain[2].hash = leniaCoin.chain[2].calculateHash(); even if I recalculate hash, the relationship between all blocks is broken after 1 is modified
console.log(JSON.stringify(leniaCoin, null, 4));

console.log("is blockchain valid? " + leniaCoin.isChainValid());
