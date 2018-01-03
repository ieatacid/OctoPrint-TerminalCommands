/*
 * View model for OctoPrint-TerminalCommands
 *
 * Author: ieatacid
 * License: AGPLv3
 */
$(function() {
    function TerminalCommandsViewModel(parameters) {
        var self = this;

        self.terminalViewModel = parameters[0];
        self.settingsViewModel = parameters[1];

        self.terminalCommands = ko.observableArray([]);

        self.addTerminalCommand = function(data) {
            console.log("addTerminalCommand: ")
            console.log(data);
            self.terminalCommands.push({name: "", commands: ""})
        };

        self.removeTerminalCommand = function(filter) {
            self.terminalCommands.remove(filter);
        };

        function getCmdFromName(name) {
            console.log("getCmdFromName: " + name);
            for(var i = 0; i < self.terminalCommands().length; i++) {
                if(name == self.terminalCommands()[i].name()) {
                    return self.terminalCommands()[i].commands();
                }
            }
        }

        // From: https://github.com/foosel/OctoPrint/blob/master/src/octoprint/static/js/app/viewmodels/terminal.js#L320
        // To bypass the terminal input textarea and not add to command history
        var commandRe = /^(([gmt][0-9]+)(\.[0-9+])?)(\s.*)?/i;
        self.sendCommand = function(command) {
            if(!command) {
                return;
            }

            var commandToSend = command;
            var commandMatch = commandToSend.match(commandRe);
            if(commandMatch !== null) {
                var fullCode = commandMatch[1].toUpperCase(); // full code incl. sub code
                var mainCode = commandMatch[2].toUpperCase(); // main code only without sub code

                if(self.terminalViewModel.blacklist.indexOf(mainCode) < 0 && self.terminalViewModel.blacklist.indexOf(fullCode) < 0) {
                    // full or main code not on blacklist -> upper case the whole command
                    commandToSend = commandToSend.toUpperCase();
                } else {
                    // full or main code on blacklist -> only upper case that and leave parameters as is
                    commandToSend = fullCode + (commandMatch[4] !== undefined ? commandMatch[4] : "");
                }
            }

            if(commandToSend) {
                OctoPrint.control.sendGcode(commandToSend);

                /**** don't add to command history ****/
                    // .done(function() {
                        // self.terminalViewModel.cmdHistory.push(command);
                        // self.terminalViewModel.cmdHistory.slice(-300); // just to set a sane limit to how many manually entered commands will be saved...
                        // self.terminalViewModel.cmdHistoryIdx = self.terminalViewModel.cmdHistory.length;
                        // self.terminalViewModel.command("");
                    // });
            }
        };

        function addButtonsToTermTab() {
            console.log("addButtonsToTermTab");
            $(".termctrl").remove();
            $("div.terminal").after("\
                <hr class=\"termctrl top-hr\">\
                <form class=\"form-horizontal termctrl\">\
                    <div class=\"termctrl\">\
                    </div>\
                </form>\
                <hr class=\"termctrl bottom-hr\">\
            ");

            // copy and reverse array so buttons appear in the order they're added (!)
            self.terminalCommands().slice(0).reverse().forEach(function(data) {
                var name, commands;

                if(typeof data.name === 'function') {
                    name = data.name();
                    commands = data.commands();
                }
                else {
                    name = data.name;
                    commands = data.commands;
                }
                console.log("Adding button: [" + name + "]  " + commands);
                $("div.termctrl").after("\
                    <button type=\"button\" class=\"btn termctrl\">" + name + "</button>\
                ");
            });

            $("button.termctrl").click(function() {
                var button = $(this);
                var command = getCmdFromName(button.text());
                console.log("Click: [" + button.text() + "]  " + command);

                if(command.split(";").length > 1) {
                    cmdList = command.split(";");

                    for(var i = 0; i < cmdList.length; i++) {
                        self.sendCommand(cmdList[i].trim());
                    }

                } else {
                    self.sendCommand(command);
                }
            });
        }

        function printCommandArray() {
            self.terminalCommands().forEach(function(data, i) {
                var name, command;
                if(typeof data.name === 'function') {
                    name = data.name();
                    commands = data.commands();
                }
                else {
                    name = data.name;
                    commands = data.commands;
                }
                console.log("printCommandArray:");
                console.log("[" + name + "]  " + commands);
            })
        }

        self.onBeforeBinding = function () {
            self.terminalCommands(self.settingsViewModel.settings.plugins.TerminalCommands.controls.slice(0));
            // printCommandArray();
            addButtonsToTermTab();
        };

        self.onSettingsBeforeSave = function () {
            self.settingsViewModel.settings.plugins.TerminalCommands.controls(self.terminalCommands.slice(0));
            // printCommandArray();
            addButtonsToTermTab();
        }
    }

    OCTOPRINT_VIEWMODELS.push([
        TerminalCommandsViewModel,
        [ "terminalViewModel", "settingsViewModel"],
        [ "#settings_plugin_TerminalCommands" ]
    ]);
});
