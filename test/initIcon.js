/**
 * Created by yk on 2016/7/4.
 */
"use strict"

const LimitRequestUtil = require('../service/LimitRequestUtil')
const mongoService = require("../service/mongoService")
const collections = require('../conf/resources.json').mongo.collectionName
const log4js =  require('log4js')
const log = log4js.getLogger(__filename)

let req = new LimitRequestUtil()


setTimeout(initIcon, 500)


function initIcon() {
    mongoService.getCollection(collections.leagues)
        .find({},{fields: {_id:0, leagueid:1, image:1}})
        .toArray()
        .then(docs => {
            for (let i = 0; i< docs.length; i++) {
                let doc = docs[i]
                req.submitDownTask(doc.image, "./image/league", () =>{
                    return doc.leagueid
                })
            }
        })
}


//req.submitDownTask("http://cdn.dota2.com.cn/apps/570/icons/econ/leagues/subscriptions_sgc_2016.cb0dab99cd9648495810be7ebf7d1035de6e9d13.png", "./image/league")