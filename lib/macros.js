function exec(macro, lircNode, i) {
  if (i === undefined) var i = 0;
  var command = macro[i];

  if (!command) { return true; }

  // increment
  i = i + 1;

  // if the command is delay, wait N msec and then execute next command
  if (command[0] === 'delay') {
    setTimeout(function() {
      exec(macro, lircNode, i);
    }, command[1]);
  } else {
    // By default, wait 100msec before calling next command
    lircNode.irsend.send_once(command[0], command[1], function () {
      setTimeout(function() {
        exec(macro, lircNode, i);
      }, 100);
    });
  }

  return i;
};

exports.exec = exec;
