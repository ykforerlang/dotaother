/**
 * Created by yk on 2016/6/7.
 */

exports.getParaFromLocation =
    function getParaFromLocation(name) {
        var qs = (location.search.length > 0 ? location.search.substring(1) : "")
        if (qs == "") return undefined  //没有查询参数

        var items = qs.split("&")
        for (i = 0; i < items.length; i++) {
            var item = items[i].split("=")
            if (item[0] == name) {
                return (item.length == 1 ? item[0] : item[1])
            }
        }
        return undefined
    }