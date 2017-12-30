
$(function() {
    function terminalCommandsDialogViewModel(parameters) {
        var self = this;

        self.title = ko.observable(gettext("Add Command"));
        self.name = ko.observable();
        self.commands = ko.observable();

        self.show = function (f) {
            var dialog = $("#terminalCommandsDialog");
            var primarybtn = $('div.modal-footer .btn-primary', dialog);

            primarybtn.unbind('click').bind('click', function (e) {
                console.log("primarybtn click");
                console.log("name: %s", self.name());
                console.log("commands: %s", self.commands());
            });
            

            //     el.width = obj.width;
            //     el.offset = obj.offset;

            //     f(el);

            dialog.modal({
                show: 'true',
                backdrop: 'static',
                keyboard: false
            });
        }
        
    }

    OCTOPRINT_VIEWMODELS.push([
        terminalCommandsDialogViewModel,
        [],
        "#terminalCommandsDialog"
    ]);
});