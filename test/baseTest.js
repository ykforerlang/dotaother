/**
 * Created by yk on 2016/4/28.
 */


function tt() {
    var argu = Array.prototype.slice.call(arguments,0)
    console.log(argu.shift())
}

tt(1)