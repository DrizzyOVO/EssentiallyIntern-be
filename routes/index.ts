import polygonClient, { restClient } from "@polygon.io/client-js";
import express from "express";
import { User, Stock } from "../db";

const router = express.Router(); 

const rest = restClient('FZ5uc_gWEtV6WspTfP9Z1M8SJY8EZs6b');
const client = polygonClient('FZ5uc_gWEtV6WspTfP9Z1M8SJY8EZs6b');

// FZ5uc_gWEtV6WspTfP9Z1M8SJY8EZs6b


let arr: any = [
    'A',     'AA',    'AAA',     'AAAU',   'AACG',   'AAL',    'AAMC',    'AAME',
    'AAN',   'AAOI',  'AAON',    'AAP',    'AAPB',    'AAPD',
    'AAPL', 'AAXJ', 'AAPU', 'AB', 'ABBV', 'ABCB'
]

let number = 0

router.get('/api/:symbol', async (req, res) => {

    const { symbol } = req.params

    rest.stocks.dailyOpenClose(`${symbol}`, "2023-03-31").then((data) => {
        res.json({ price: data.open })
    }).catch(e => {
        res.json({ error: e });
    })


}); 

router.post("/apis/:id", async (req, res) => {

    const { id } = req.params; 
    const count = Number.parseInt(id); 
    number = count 

    async function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let i=0; 

    async function delayedLoop() {
        while (i < count) {

            await rest.stocks.dailyOpenClose(`${arr[i]}`, "2023-03-31").then(async (data) => {
                // await delay(5000); 
                const stock = await Stock.findOne({ symbol: data.symbol }); 

                if(stock) { 
                    stock.open = data.open; 
                    stock.symbol = data.symbol;
                    await stock.save(); 
                    i++; 
                } else {
                    const newStock = new Stock({ symbol: data.symbol, open: data.open }); 
                    const done = await newStock.save() 
                    if(done) { 
                        console.log('doneeee');
                        i++; 
                    } else {
                        console.log('error'); 
                    }
                } 

            }).catch(e => {
                console.log('error :- ' + e);
            })   

            
        }
    }

    await delayedLoop();

    res.json({ message: 'done' }); 
    
    setTimeout(smth, 20000)
    

})

router.get('/mongo', async (req, res) => {

    // for(let i = 0; i < number;)

    const prices = await Stock.find({ }); 

    if(prices) { 
        res.json({ prices: prices })
    } else { 
        res.json({ error: 'error' })
    }


});

async function sec3() {
    
    const sec3 = ['A',     'AA',    'AAA',     'AAAU',   'AACG']

    sec3.map(async (item) => {
        const find = await Stock.findOne({ symbol: item }); 

        if(find) { 
            find.open = 100 * Math.random();  
            await find.save(); 
        } else { 
            console.log('error'); 
        }

    })

}

async function sec5() {
    
    const sec5 = ['AAL', 'AAMC', 'AAME', 'AAN', 'AAOI', 'AAON', 'AAP', 'AAPB', 'AAPD', 'AAPL']

    sec5.map(async (item) => {
        const find = await Stock.findOne({ symbol: item }); 

        if(find) { 
            find.open = 100 * Math.random();  
            await find.save(); 
        } else { 
            console.log('error'); 
        }

    })

}

async function sec4() {
    
    const sec4 = ['AAXJ', 'AAPU', 'AB', 'ABBV', 'ABCB']

    sec4.map(async (item) => {
        const find = await Stock.findOne({ symbol: item }); 

        if(find) { 
            find.open = 100 * Math.random();  
            await find.save(); 
        } else { 
            console.log('error'); 
        }

    })

}

async function smth() { 

    setInterval(sec5, 5000) 
    setInterval(sec3, 3000) 
    setInterval(sec4, 3000)

}

export default router; 