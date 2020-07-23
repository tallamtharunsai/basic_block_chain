const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index, timestamp, data, previousHash = ' '){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0, "02/11/2019", "Genesis Block", "0");
	}
	
	getLatestBlock(){
	    return this.chain[this.chain.length - 1];
	}
	
	addBlock(newBlock){
	    newBlock.previousHash = this.getLatestBlock().hash;
	    newBlock.hash = newBlock.calculateHash();
	    this.chain.push(newBlock);
	}
	
	isChainValid(){
	    for(let i =1;i<this.chain.length; i++){
	        const currentBlock = this.chain[i];
	        const previousBlock = this.chain[i-1];
	        
	        if(currentBlock.hash != currentBlock.calculateHash()){
	            return false;
	        }
	        
	        if(currentBlock.previousHash != previousBlock.hash){
	            return false;
	        }
	    }
	    
	    return true;
	}
	
}

let tarun = new Blockchain();
tarun.addBlock(new Block(1, "05/11/2019", {amount: 1000}));
tarun.addBlock(new Block(2, "06/11/2019", {amount: 2000}));
tarun.addBlock(new Block(3, "07/11/2019", {amount: 3000}));
tarun.addBlock(new Block(4, "08/11/2019", {amount: 5000}));
tarun.addBlock(new Block(5, "09/11/2019", {amount: 6000}));


console.log(JSON.stringify(tarun, null, 4));

console.log("Is blockchain is valid? " + tarun.isChainValid());

tarun.chain[1].data = {amount: 5000000};
tarun.chain[1].hash = tarun.chain[1].calculateHash();

console.log(JSON.stringify(tarun, null, 4));

console.log("Is blockchain is valid? " + tarun.isChainValid());
