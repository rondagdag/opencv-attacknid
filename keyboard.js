"use strict";

var Cylon = require("cylon");


var commands = {};
commands["forward"] = "7100028080808001";
commands["backward"] = "7100828080808002";

commands["left"] = "7100808280808008";
commands["right"] = "7100800280808004";

commands["down"] = "7100808002808010";
commands["up"] = "7100808082808020";

commands["light"] = "7100808080800240";
commands["fire"] = "7100808080808280";

//var selectedCommand = commands["forward"];


var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort(); 
btSerial.on('found', function(address, name) {
    console.log(address);
    btSerial.findSerialPortChannel(address, function(channel) {
        btSerial.connect(address, channel, function() {
            console.log(address);
            console.log('connected');
 
            /*btSerial.write(new  Buffer('7100028080808001','hex'), function(err, bytesWritten) {
                if (err) console.log(err);
            });*/
 
            btSerial.on('data', function(buffer) {
                //console.log(buffer);
                
                /*if (moveForward)
                {
                 btSerial.write(new  Buffer('7100028080808001','hex'), function(err, bytesWritten) {
                        if (err) console.log(err);
                 });
                }*/
                //console.log(buffer.toString('utf-8'));
            });
        }, function () {
            console.log('cannot connect');
        });
 
        // close the connection when you're ready 
        btSerial.close();
    }, function() {
        console.log('found nothing');
    });
});
 
btSerial.inquire();

function SendCommand(command) {
    if (btSerial.isOpen()) {
        btSerial.write(new Buffer(command, 'hex'), function (err, bytesWritten) {
            if (err) console.log(err);
        });
    }
}
Cylon.robot({
  connections: {
    keyboard: { adaptor: "keyboard" }
  },

  devices: {
    keyboard: { driver: "keyboard" }
  },

  work: function(my) {
      my.keyboard.on('left', function (key) {
          console.log('left key pressed');
          SendCommand(commands['left']);
      });

      my.keyboard.on('right', function (key) {
          console.log('right key pressed');
          SendCommand(commands['right']);
      });

      my.keyboard.on('up', function (key) {
          console.log('up key pressed');
          SendCommand(commands['up']);
      });

      my.keyboard.on('down', function (key) {
          console.log('down key pressed');
          SendCommand(commands['down']);
      });

      my.keyboard.on('f', function (key) {
          SendCommand(commands['forward']);
      });

      my.keyboard.on('b', function (key) {
          SendCommand(commands['backward']);
      });

      my.keyboard.on('n', function (key) {
          SendCommand(commands['fire']);
      });

      my.keyboard.on('m', function (key) {
          SendCommand(commands['light']);
      });
  }
}).start();
