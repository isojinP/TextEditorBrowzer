var input;
var reader;
var output;

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

	// 編集中止
	document.getElementById('cancel').addEventListener('click', function(e) {
		mode_changer(0);
	});

});

function mode_changer(mode){
	var edit_file;

	if(mode == 0){	//File selector mode
		document.getElementById('selecter').style.display = "contents";
		document.getElementById('editor').style.display = "none";
		document.title = "TextEditor";
		edit_file = null;		
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
		}
	}
}


