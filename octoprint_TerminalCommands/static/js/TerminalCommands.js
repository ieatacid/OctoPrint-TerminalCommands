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
        self.terminalCommandsDialogViewModel = parameters[2];

        self.terminalCommands = ko.observableArray([]);

        self.addTerminalCommand = function() {
            self.terminalCommands.push({name: "Label", commands: "Command"})
        };

        self.removeTerminalCommand = function(filter) {
            self.terminalCommands.remove(filter);
        };

        function getCmdFromName(name) {
            var returnCmd = ko.utils.arrayFirst(self.terminalCommands(), function(cmd) {
                if(typeof cmd.name === 'function')
                    return cmd.name() == name;
                return cmd.name;
            });

            if(typeof returnCmd.commands === 'function')
                return returnCmd.commands();
            return returnCmd.commands;
        }

        function sendCommandToTerminal(command) {
            self.terminalViewModel.command(command);
            self.terminalViewModel.sendCommand();
        }

        function addButtonsToTermTab() {
            $(".termctrl").remove();
            $("#terminal-filterpanel").before("\
                <hr class=\"termctrl\">\
                <form class=\"form-horizontal termctrl\">\
                    <div class=\"termctrl\">\
                    </div>\
                </form>\
                <hr class=\"termctrl\">\
            ");

            // copy and reverse array so buttons appear in the order they're added (!)
            self.terminalCommands().slice(0).reverse().forEach(function(data) {
                var name;
                if(typeof data.name === 'function')
                    name = data.name();
                else
                    name = data.name;
                $("div.termctrl").after("\
                    <button type=\"button\" class=\"btn termctrl\">" + name + "</button>\
                ");
            });
                            
            $("button.termctrl").click(function() {
                var button = $(this);
                var command = getCmdFromName(button.text());
                console.log("button name: %s", button.text());
                console.log("button cmd: %s", command);

                if(command.split("|").length > 1) {
                    cmdList = command.split("|");
                    command = "";
                    for(var i = 0; i < cmdList.length; i++) {
                        sendCommandToTerminal(cmdList[i]);
                    }
                } else {
                    sendCommandToTerminal(command);
                }
            });
        }

        function sleep(delay) {
            var start = new Date().getTime();
            while (new Date().getTime() < start + delay);
        }

        function debugArray() {
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
                console.log("[" + name + "] ==> " + commands);
            })
        }

        self.onBeforeBinding = function () {
            console.log("onBeforeBinding");
            self.terminalCommands(self.settingsViewModel.settings.plugins.TerminalCommands.controls.slice(0));
            debugArray();
            addButtonsToTermTab();
        };

        self.onSettingsBeforeSave = function () {
            console.log("onSettingsBeforeSave");
            self.settingsViewModel.settings.plugins.TerminalCommands.controls(self.terminalCommands.slice(0));
            debugArray();
            addButtonsToTermTab();
        }
    }

    OCTOPRINT_VIEWMODELS.push([
        TerminalCommandsViewModel,
        [ "terminalViewModel", "settingsViewModel", "terminalCommandsDialogViewModel"],
        [ "#settings_plugin_TerminalCommands" ]
    ]);
});
