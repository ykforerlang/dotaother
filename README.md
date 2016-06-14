# dotaother
dota other not max



blog
1.react:https://www.kirupa.com/react/events_in_react.htm
     The reason is because components are wrappers for DOM elements.
     What does it even mean to listen for an event on a component?
     Once your component gets unwrapped into DOM elements, does the outer HTML element act as the thing you are listening for the event on?
     Is it some other element?
     How do you distinguish between listening for an event and declaring a prop you are listening for?
     (onClick as defined here is simply a property of that component.)

     There is no clear answer to any of those questions.
     It's too harsh to say that the solution is to simply not listen to events on components either.
     Fortunately, there is a workaround where we treat the event handler as a prop and pass it on to the component.
     Inside the component,
     we can then assign the event to a DOM element and set the event handler to the the value of the prop we just passed in.
     I realize that probably makes no sense, so let's walk through an example.

2.mongodb: https://mongodb.github.io/node-mongodb-native/api-generated/collection.html#find

3.express : http://expressjs.com/zh-cn/guide/using-middleware.html

4.dota2 api
   league: IIRC Premium = money from ticket goes to prize pool
           Pro = high prize pool tourney but no extra money to prize pool
           Am = amateur = low prize pool tourney w/ no extra money to prize pool
    steam 接口
    获取联赛列表：　http://api.steampowered.com/IDOTA2Match_570/GetLeagueListing/v1/?key=577A366039269967223A15C59EDE6D3B&language=zh_cn
    根据dotaId获取比赛（筛选比较复杂） ：https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v001/?key=577A366039269967223A15C59EDE6D3B&league_id=2339
    根据mathId 获取比赛详细信息： http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key=577A366039269967223A15C59EDE6D3B&match_id=1022565334
    http://api.steampowered.com/IDOTA2Teams_570/GetTeamInfo/v1?key=577A366039269967223A15C59EDE6D3B&league_id=4325
    steam 接口说明：
         http://steamwebapi.azurewebsites.net/
    100场： 1450688718 - 1450687298 = 1500s = 150 /6 = 25min




