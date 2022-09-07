

export function objectDownload (object, filename, extension = null) {
    let blob = new Blob([object], {type: "octet/stream;charset=utf-8"});
    let url = URL.createObjectURL(blob);
    console.log(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename + (extension ? '.' + extension : '');
    a.style.display='none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}      