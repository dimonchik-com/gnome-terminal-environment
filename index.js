var shell = require('shelljs');

var number=shell.exec(`xprop -root | grep "_NET_ACTIVE_WINDOW(WINDOW)"| awk '{print $5}'`);

var password=process.env.pass;
var path=process.env.path;
var ssh=process.env.ssh;

start_command([`tail -f -n 25 ${path}/warn.log`, [`cd ${path}/`, 'node watch.js']]);

function start_command(ar) {
    var path=ar.splice(0,1);

    //shell.exec(`xdotool windowfocus ${number}`).exec('xdotool key KP_Enter');

    shell.exec('xdotool key ctrl+shift+t');
    shell.exec(`xdotool type 'ssh ${ssh}'`).exec('xdotool key KP_Enter');

    setTimeout(function () {
        shell.exec(`xdotool type "${password}"`).exec('xdotool key KP_Enter');
        if(typeof path[0] != 'string' ) {
            shell.exec(`xdotool type "${path[0][0]}"`).exec('xdotool key KP_Enter');
            path[0]=path[0][1];
        }
        shell.exec(`xdotool type "${path[0]}"`).exec('xdotool key KP_Enter');
        if(ar.length) start_command(ar);
    },500);
}