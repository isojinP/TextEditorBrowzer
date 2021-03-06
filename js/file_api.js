var input;
var reader;
var output;
var filename = "";
var fontMode = 0;

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

	// 「new file」クリック(新規作成)
	document.getElementById('new').addEventListener('click', function(e) {
		mode_changer(2);
	});

	// 「edit cancel」クリック(編集中止)
	document.getElementById('cancel').addEventListener('click', function(e) {
		mode_changer(0);
	});

	// 「txt save」クリック(「.txt」形式で保存)
	document.getElementById('txt_design').addEventListener('click', function(e) {
		saveFile("downloader", filename+".txt", document.getElementById('contents').innerHTML.replace(/(<br>)/g, '\r\n'));
			$("#downloader")[0].click();
	});
	// 「html save」クリック(「.html」形式で保存)
	document.getElementById('html_design').addEventListener('click', function(e) {
		saveFile("downloader", filename+".html", document.getElementById('contents').innerHTML);
			$("#downloader")[0].click();
	});
	// 「reload」クリック(現在の編集内容を「HTML」形式に変換して再表示)
	document.getElementById('reload_design').addEventListener('click', function(e) {
		document.getElementById('contents').innerHTML = EscapeUnlimite(document.getElementById('contents').innerHTML);
	});

	// 「font color」クリック(編集画面のフォント色と背景色のパターンを切り替える)
	document.getElementById('color_design').addEventListener('click', function(e) {
		fontMode = (fontMode + 1) % 4;
		fontColor(fontMode);
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
		if(mode == 1){
			edit_file = input;
			reader = new FileReader();
			// ファイル読み込み成功時、内容を<div id="contents">へ出力
			reader.addEventListener('load', function(e) {
				output = reader.result.replace(/(\r\n)/g, '<br>');
				output = output.replace(/(\n|\r)/g, '<br>');
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
		} else {
				document.getElementById('selecter').style.display = "none";
				document.getElementById('editor').style.display = "contents";
				document.title = "New File";
				filename = "Undefined";
		}
	}
}

function saveFile(id, name, content) {
	// 指定されたデータを保持するBlobを作成する。
	content = EscapeUnlimite(content);
    var blob = new Blob([ content ], { "type" : "application/x-msdownload" });
	// Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
    window.URL = window.URL || window.webkitURL;
	document.getElementById(id).setAttribute("href", window.URL.createObjectURL(blob));
	document.getElementById(id).setAttribute("download", name);
}

function EscapeUnlimite(str) {
	str = str.replace(/(&lt;)/g,'<');
	str = str.replace(/(&gt;)/g,'>');
	str = str.replace(/(&quot;)/g,'"');
	str = str.replace(/(&amp;)/g,'&');
	str = str.replace(/(&nbsp;)/g,' ');
	str = str.replace(/(&apos;)/g,"'");

	return str;
}

function fontColor(mode) {
	if(mode%4 == 0){
		document.body.style.backgroundColor = "#ffffff";
		document.body.style.color = "#000000";

		document.getElementById('img_font_color').setAttribute("src","./icon/font_black.png");
	}else if(mode%4 == 1){
		document.body.style.backgroundColor = "#000000";
		document.body.style.color = "#ffffff";

		document.getElementById('img_font_color').setAttribute("src","./icon/font_white.png");
	}else if(mode%4 == 2){
		document.body.style.backgroundColor = "#1d543f";
		document.body.style.color = "#d0ff92";

		document.getElementById('img_font_color').setAttribute("src","./icon/font_green.png");
	}else{
		document.body.style.backgroundColor = "#d0ff92";
		document.body.style.color = "#1d543f";

		document.getElementById('img_font_color').setAttribute("src","./icon/font_yellow.png");
	}
}

