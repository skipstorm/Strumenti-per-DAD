$(document).ready(function(){
    $(document).ready(function() {
        $('.datatables').DataTable();
    } );
    $("[data-script-textfile]").each(function(){
        var that = this;
        $('input[type="file"]', that).on("change", function(event){
            $(that).addClass('loading');
            if (typeof window.FileReader !== 'function')
                throw ("The file API isn't supported on this browser.");
            let input = event.target;
            if (!input)
                throw ("The browser does not properly implement the event object");
            if (!input.files)
                throw ("This browser does not support the `files` property of the file input.");
            if (!input.files[0])
                return undefined;
            let file = input.files[0];
            let fr = new FileReader();
            fr.onload = function(event){
                $('textarea', that).text(event.target.result);
                $(that).trigger("textfile:loaded");
                $(that).removeClass('loading');
            };
            fr.readAsText(file);
        });
    });

function onFileLoad(elementId, event) {
    document.getElementById(elementId).innerText = event.target.result;
}

function onChooseFile(event, onLoadFileHandler) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
}
  
});