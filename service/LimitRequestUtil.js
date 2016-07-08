/**
 * Created by yk on 2016/7/4.
 */
"use strict"
const request = require("request")
const log4js =  require('log4js')
const fs =  require('fs')
const path =  require('path')
const log = log4js.getLogger(__filename)

const  DEFAULT_CONCURRENCE_SIZE = 20
const  DEFAULT_TIMEOUTS = 5000
class LimitRequestUtil {
    /*static  DEFAULT_CONCURRENCE_SIZE : 20
    static  DEFAULT_TIMEOUTS : 5000*/

    constructor(opt) {
        opt = opt ? opt :{}
        this.nowSize = 0
        this.taskQueue = []
        this.concurrence_size = opt.concurrence_size || DEFAULT_CONCURRENCE_SIZE
        this.timeouts = opt.timeouts || DEFAULT_TIMEOUTS
    }

    // 如果现在的 访问数小于size， 直接访问， 否则放到队列
    submitTask(url, cb) {
        log.info("submit a task:", url)
        let self = this

        if (this.nowSize <= this.concurrence_size) {
            let wrapCb = function() {
                self.nowSize--
                let firstTask = self.taskQueue.shift()

                if(!firstTask) {
                    // 队列为空  do nothing
                } else if (firstTask.targetDir) {
                    this.submitDownTask(firstTask.url, firstTask.targetDir)
                } else {
                    this.submitTask(firstTask.url, firstTask.cb)
                }

                cb.call(this, Array.prototype.slice.call(arguments))  // 恢复 cb的调用, 包括this和参数
            }
            request.get(url, wrapCb)
            this.nowSize++
        } else {
            this.taskQueue.push({url:url, cb:cb})
        }
    }

    //下载任务， 比如静态文件
    submitDownTask(url, targetDir, nameFunc) {
        log.info("submit a task:", url)

        let nameFuncRel = nameFunc ? nameFunc : this.__getFileName

        if (this.nowSize <= this.concurrence_size) {
            let fileName = nameFuncRel(url)
            let stream = request(url)
            stream.pipe(fs.createWriteStream(path.resolve(targetDir, fileName)))
            stream.on('end', ()=>{
                log.info("handled a task:", url, "nowSize:", this.nowSize)
                this.nowSize--
                let firstTask = this.taskQueue.shift()

                if(!firstTask) {
                    // 队列为空  do nothing
                } else if (firstTask.targetDir) {
                    this.submitDownTask(firstTask.url, firstTask.targetDir)
                } else {
                    this.submitTask(firstTask.url, firstTask.cb)
                }
            })
            this.nowSize++
        } else {
            this.taskQueue.push({url:url, targetDir:targetDir})
        }
    }


    __getFileName(url) {
        let start = url.lastIndexOf("/")
        let end = url.indexOf("?")
        end = end == -1 ? url.length : end
        return url.substring(start + 1, end)
    }
}

module.exports = LimitRequestUtil
