/**
 * Created by yk on 2016/5/10.
 * parse value data format
 */

const kvn = require("keyvalues-node")
const fs = require("fs")
const dota2Web = require("../service/dota2Web")
const resources = require("../conf/resources.json")
const webKey = resources.webKey
const LimitRequestUtil = require('../service/LimitRequestUtil')

const req = new LimitRequestUtil({concurrence_size: 20})

const leagueBriefsFile = "../conf/leagueBriefs.json"
let leagueBriefs = {}
// how to get itemsGame.txt ? fetch this api: http://api.steampowered.com/IEconItems_570/GetSchemaURL/v1
fs.readFile("../conf/itemsGame.txt", function(err, data) {
    let result = kvn.decode(data.toString())
    let items = result.items_game.items

    dota2Web.getLeagueListing({"language": "zh"}, function(err, data) {
        let webLeaList = JSON.parse(data)
        let leagues = webLeaList.result.leagues
        for (let key in leagues) {
            let lea = leagues[key]
            initLeagueInfo(lea, items[lea.itemdef])
        }
        leagueBriefs.amateur = amateur.reverse().slice(0, 50) //amateur  just 50
        leagueBriefs.professional = professional.reverse()
        leagueBriefs.premium = premium.reverse()
        fs.writeFile(leagueBriefsFile, JSON.stringify(leagueBriefs))

        let leagueInfosAll = leagueBriefs.professional.concat(leagueBriefs.premium, leagueBriefs.amateur)
        initIconAndPricePool(leagueInfosAll)
    })

})

let amateur = []
let professional = []
let premium =[]
function initLeagueInfo(webLea, fileLea) {
    if(fileLea && webLea.itemdef >= 16191) { // too old league will lose deliberately

        let leagueAllInfo = {
            id:webLea.leagueid,
            name:webLea.name,
            description:webLea.description,
            itemdef:webLea.itemdef,
            creationDate:fileLea.creation_date,
            imageInventory:fileLea.image_inventory,
        }

        let usage = fileLea.tool.usage
        if (usage) {
            leagueAllInfo.free_to_spectate =Number(usage.free_to_spectate || 0)
            if (usage.tier == "amateur") {
                amateur.push(leagueAllInfo)
            } else if (usage.tier == "premium"){
                premium.push(leagueAllInfo)
            } else if (usage.tier == "professional") {
                professional.push(leagueAllInfo)
            }else {
                //do nothing
            }
        }
    }
}

function initIconAndPricePool(leagueInfosAll) {
    for (let i = 0; i< leagueInfosAll.length; i++){
        let league = leagueInfosAll[i]
        let event = league.imageInventory.substring(13)
        let iconPrefix =  `https://api.steampowered.com/IEconDOTA2_570/GetItemIconPath/v1/?key=${webKey}&format=json&iconname=${event}`
        req.submitTask(iconPrefix, (err, res, body) =>{
            if (err || res.statusCode != 200) {
                console.log("get league:", league.id, "  ", league.imageInventory," icon url err:", err)
            } else {
                let image = resources.iconCDN + JSON.parse(body).result.path
                req.submitDownTask(image, "./image/league3", () =>{
                    return league.id + ".png"
                })
            }
        })
    }
}


