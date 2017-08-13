function downloadFile(th) {
    var url = $(th).data("url");
    var fileName = $(th).data("name");

    $.ajax({
        url: url,
        success: function(data) {
            var blob=new Blob([data]);

            var file = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = file;
            a.download = fileName;
            console.log(file);
            document.body.appendChild(a);
            a.click();

            window.onfocus = function () {
                document.body.removeChild(a)
            }
        }
    });
}