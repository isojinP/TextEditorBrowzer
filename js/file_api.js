var input;
var reader;
var output;
var filename = "";

window.addEventListener('DOMContentLoaded', function() {
	// ページ読み込み時(一度、ファイルの選択を初期化)
	window.onload = function(){
		mode_changer(0);
	}

	// ファイル選択時
	document.getElementById('file').addEventListener('change', function(e) {
	// ユーザーの環境が「File API」を利用可能かどうかを確認
		if (window.File) {
			input = document.getElementById('file').files[0];
			mode_changer(1);
		}
	}, true);

	// 「edit cancel」クリック(編集中止)
	document.getElementById('cancel').addEventListener('click', function(e) {
		mode_changer(0);
	});

	// 「txt save」クリック(「.txt」形式で保存)
	document.getElementById('txt_design').addEventListener('click', function(e) {
		saveFile("downloader", filename+".txt", document.getElementById('contents').innerHTML);
		var downloader = document.getElementById('downloader');
		downloader.onclick();
	});
	// 「html save」クリック(「.html」形式で保存)
	document.getElementById('html_design').addEventListener('click', function(e) {
		saveFile("downloader", filename+".html", document.getElementById('contents').innerHTML);
		var downloader = document.getElementById('downloader');
		downloader.onclick();
	});

});

function mode_changer(mode){
	var edit_file;

	if(mode == 0){	//File selector mode
		document.getElementById('selecter').style.display = "contents";
		document.getElementById('editor').style.display = "none";
		document.title = "TextEditor";
		edit_file = null;		
		filename = "";
	}else{			//File editor mode
		edit_file = input;
		reader = new FileReader();
		// ファイル読み込み成功時、内容を<div id="contents">へ出力
			reader.addEventListener('load', function(e) {
			output = reader.result.replace(/(\n|\r)/g, '<br />');
			document.getElementById('contents').innerHTML = output;
		}, true);
		reader.readAsText(edit_file, 'UTF-8');
		// 編集モードとしてページを更新
		reader.onload = function(event) {
			document.getElementById('selecter').style.display = "none";
			document.getElementById('editor').style.display = "contents";
			document.title = edit_file.name;
			var n = edit_file.name.lastIndexOf(".");
			filename = n > -1 ? edit_file.name.substr(0, n) : edit_file.name;
		}
	}
}

function saveFile(id, name, content) {

 // 指定されたデータを保持するBlobを作成する。
    var blob = new Blob([ content ], { "type" : "application/x-msdownload" });
 
 // Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
    window.URL = window.URL || window.webkitURL;
//	document.getElementById(id).setAttribute("href", window.URL.createObjectURL(blob));
	location.href = window.URL.createObjectURL(blob);
//	document.getElementById(id).setAttribute("download", name);

//	console.log(filename);
//	console.log(name);
}
