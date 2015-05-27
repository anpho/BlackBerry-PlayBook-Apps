LastNo = 0;
SPACECHAR = " ";
CandChinesePart = new Array();
CandCompPart = new Array();
AsciiStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
AsciiStr = AsciiStr.split(",");
CtrlDown = false;
CancelKey = false;
passNextKeyPress = true;

function FindIn(d) {
  var f = -1,
  a = 0,
  c = 0,
  e = CodeList.length;
  var b = "";
  while (a < e) {
    c = (a + e) / 2;
    c = Math.floor(c);
    b = CodeList[c];
    if (b.indexOf(d, 0) == 0) {
      f = c;
      break
    }
    b = CodeList[c - 1];
    if (b.indexOf(d, 0) == 0) {
      f = c;
      break
    }
    if (b < d) {
      a = c + 1
    } else {
      e = c - 1
    }
  }
  while (f > 0) {
    b = CodeList[f - 1];
    if (b.indexOf(d, 0) == 0) {
      f--
    } else {
      break
    }
  }
  return (f)
}
function clean(n){
	switch(n){
	case 0:
	document.getElementById("k1").value='1';
	document.getElementById("k1").disabled=true;
	case 1:
	document.getElementById("k2").value='2';
	document.getElementById("k2").disabled=true;
	case 2:
	document.getElementById("k3").value='3';	
	document.getElementById("k3").disabled=true;
	case 3:
	document.getElementById("k4").value='4';	
	document.getElementById("k4").disabled=true;
	case 4:
	document.getElementById("k5").value='5';	
	document.getElementById("k5").disabled=true;
	case 5:
	document.getElementById("k6").value='6';	
	document.getElementById("k6").disabled=true;
	case 6:
	document.getElementById("k7").value='7';	
	document.getElementById("k7").disabled=true;
	case 7:
	document.getElementById("k8").value='8';	
	document.getElementById("k8").disabled=true;
	case 8:
	document.getElementById("k9").value='9';	
	document.getElementById("k9").disabled=true;
	case 9:
	document.getElementById("k0").value='0';	
	document.getElementById("k0").disabled=true;
	}
}
function GetStr(a, c) {
  var e = "",
  d = "";
  var b;
  for (b = 0; b <= 9; b++) {
    if (a + b > CodeList.length - 1) {
	    clean(b);
      break;
    }
    e = CodeList[a + b];
    if (e.indexOf(c) == 0) {
      d = CodeList[a + b];
      CandCompPart[b] = d.substring(c.length, d.indexOf(SPACECHAR));
      CandChinesePart[b] = d.substr(d.lastIndexOf(SPACECHAR) + 1);
      if (b <= 8) {
        IME.Cand.value += (b + 1) + "." + CandChinesePart[b] + CandCompPart[b] + " ";
        document.getElementById("k"+(b+1)).value=CandChinesePart[b];
        document.getElementById("k"+(b+1)).disabled=false;
        clean(b+1);
      } else {
        IME.Cand.value += (0) + "." + CandChinesePart[b] + CandCompPart[b] + " ";
        document.getElementById("k0").value=CandChinesePart[b];
        document.getElementById("k0").disabled=false;
      }
    } else {
      break
    }
  }
  IME.pgup.disabled=true;
  IME.pgdn.disabled=true;

  if (a > 10 && CodeList[a - 10].indexOf(c) == 0) {
    IME.Cand.value += "<.\u4E0A\u9875";
    IME.pgup.disabled=false;
  }
  if (b == 10 && a <= CodeList.length - 11 && CodeList[a + b].indexOf(c) == 0) {
    IME.Cand.value += ">.\u4E0B\u9875";
    IME.pgdn.disabled=false;
  }
  LastNo = a
}
function Grep(b) {
  var a = -1;
  for (i = 0; i <= 9; i++) {
    CandChinesePart[i] = ""
  }
  if (b != "") {
    a = FindIn(b);
    if (a >= 0) {
      GetStr(a, b)
    }else{
    clean(0);}
    
  }
  if (CandChinesePart[0] != "" && CandChinesePart[1] == "" && CandCompPart[0] == "") {
    SendCand(0)
  }
}

function SendCand(a) {
  if (a >= 0 && a <= 9) {
    SendStr(CandChinesePart[a]);
    IME.Comp.value = "";
    IME.Cand.value = ""
  }
}
function setSelectionRange(b, c, d) {
  if (b.setSelectionRange) {
    b.focus();
    b.setSelectionRange(c, d)
  } else {
    if (b.createTextRange) {
      var a = b.createTextRange();
      a.collapse(true);
      a.moveEnd("character", d);
      a.moveStart("character", c);
      a.select()
    }
  }
}
function setCaretToEnd(a) {
  setSelectionRange(a, a.value.length, a.value.length)
}
function setCaretToBegin(a) {
  setSelectionRange(a, 0, 0)
}
function setCaretToPos(a, b) {
  setSelectionRange(a, b, b)
}
function SendStr(c) {
clean(0);
  IME.pgup.disabled=true;
  IME.pgdn.disabled=true;

  if (c == "") {
    return
  }
  switch (browser) {
  case 1:
    var d = document.selection.createRange();
    d.text = c;
    d.select();
    break;
  case 2:
    var h = IME.InputArea;
    var e = h.selectionStart;
    var g = h.selectionEnd;
    var b = h.scrollTop;
    var f = h.scrollHeight;
    var a = h.value.length;
    h.value = h.value.substring(0, e) + c + h.value.substring(g);
    h.selectionStart = h.selectionEnd = e + c.length;
    if (h.value.length == a) {
      h.scrollTop = h.scrollHeight
    } else {
      if (h.scrollHeight > f) {
        h.scrollTop = b + h.scrollHeight - f
      } else {
        h.scrollTop = b
      }
    }
    break;
  default:
    IME.InputArea.value += c
  }
}


function ImeKeyDown(c) {
  showtip('');
  var b = "";
  if (!c) {
    c = window.event
  }
  var a = c.which ? c.which: c.keyCode;
  CtrlDown = false;
  passNextKeyPress = false;
  switch (a) {
  case 8:
    if (IME.Comp.value != "") {
      b = IME.Comp.value;
      IME.Comp.value = b.substr(0, b.length - 1);
      if (IME.Comp.value == "") {clean(0);}
      IME.Cand.value = "";
      Grep(IME.Comp.value);
      CancelKey = true;
      return (false)
    }
    return (true);
  case 9:
    SendStr("\u3000");
    CancelKey = true;
    clean(0);
    return (false);
  case 27:
    IME.Comp.value = "";
    IME.Cand.value = "";
    CancelKey = true;
    return (false);
  case 109:
  case 189:
  case 33:
    b = IME.Comp.value;
    if (b != "") {
      if (LastNo > 10 && CodeList[LastNo - 10].indexOf(b) == 0) {
        IME.Cand.value = "";
        GetStr(LastNo - 10, b)
      }
      CancelKey = true;
      return (false)
    }
    break;
  case 107:
  case 61:
  case 187:
  case 34:
    b = IME.Comp.value;
    if (b != "") {
      if (LastNo <= CodeList.length - 11 && CodeList[LastNo + 10].indexOf(b) == 0) {
        IME.Cand.value = "";
        GetStr(LastNo + 10, b)
      }
      CancelKey = true;
      return (false)
    }
    break;
  case 32:
    if (IME.Comp.value != "") {
      SendCand(0);
      CancelKey = true;
      return (false)
    }
    return (true);
  case 13:
    if (IME.Comp.value != "") {
      SendStr(IME.Comp.value);
      IME.Comp.value = "";
      IME.Cand.value = "";
      CancelKey = true;
      return (false)
    }
    return (true);
    CancelKey = true;
    return (false);
  case 123:
  case 57356:
    CancelKey = true;
    return (false);
  case 17:
  case 57402:
    CtrlDown = true;
    break;
  case 36:
  case 35:
  case 37:
  case 38:
  case 39:
  case 40:
  case 45:
  case 46:
  case 91:
  case 112:
  case 114:
  case 115:
  case 116:
  case 117:
  case 118:
  case 119:
  case 120:
  case 121:
  case 122:
    passNextKeyPress = true;
    return (true)
  }
  if (a >= 48 && a <= 57) {
      if (IME.Comp.value == "") {
        if (!IME.EnglishMode.checked) {
        CancelKey =false;
          return (true)
        }
      } else {
        if (!IME.EnglishMode.checked) {
          SendCand(a == 48 ? 9 : (a - 49));
          CancelKey = true;
          return (false)
        }
      
    }
    return (true)
  }
  if (!IME.EnglishMode.checked) {
    if (a >= 186 && a <= 192) {

      CancelKey = false;
      return (true)
    }
    if (a >= 219 && a <= 222) {
      CancelKey = false;
      return (true)
    }
  }
  if (browser == 2) {
    if (!IME.EnglishMode.checked) {
      switch (a) {
      /* ; */
      case 59:
      case 61:
      case 109:
      CancelKey = false;
      return (true);
      }
    }
  }
  return (true)
}
function ImeKeyPress(b) {
  if (!b) {
    b = window.event
  }
  var a = b.which ? b.which: b.keyCode;
  if (passNextKeyPress) {
    return (true)
  }
  if (browser == 2 || browser == 3) {
    if (CancelKey) {
      CancelKey = false;
      return (false)
    }
  }
  if (a >= 65 && a <= 90) {
    if (IME.EnglishMode.checked) {
      return (true)
    } else {
      s = IME.Comp.value;
      if (s.length < MAX) {
        IME.Comp.value += AsciiStr[a - 65];
        IME.Cand.value = "";
        Grep(IME.Comp.value)
      }
      return (false)
    }

  }
  if (a >= 97 && a <= 122) {
    if (IME.EnglishMode.checked) {
      return (true)
    } else {
      s = IME.Comp.value;
      if (s.length < MAX) {
        IME.Comp.value += AsciiStr[a - 97];
        IME.Cand.value = "";
        Grep(IME.Comp.value)
      }
      return (false)
    }
  }
  if (browser == 2) {
    switch (a) {
    case 47:
    case 63:
      if (!IME.EnglishMode.checked) {
        return (false)
      }
      break
    }
  }
  return (true)
}

function toggleEnMode(){
	IME.EnglishMode.checked=!IME.EnglishMode.checked;
	showbtn();
	IME.InputArea.focus();
}
function showbtn(){
	var mode=IME.EnglishMode.checked;
	if (mode) {
	//en
	IME.enbtn.value='EN';
	} else{
	IME.enbtn.value='CH';
	}
}
function BodyOnLoad() {
  browser = (navigator.appName.indexOf("Microsoft") != -1) ? 1 : (navigator.appName.indexOf("Netscape") != -1) ? 2 : (navigator.appName.indexOf("Opera") != -1) ? 3 : 4;
  if (browser == 2 && navigator.userAgent.indexOf("Safari") != -1) {
    browser = 5
  }
  IME = {
    InputArea: document.getElementById("InputArea"),
    Comp: document.getElementById("Comp"),
    Cand: document.getElementById("Cand"),
    EnglishMode: document.getElementById("EnglishMode"),
    pgup:document.getElementById("pageup"),
    pgdn:document.getElementById("pagedown"),
    enbtn: document.getElementById ("en")
  };
  
  IME.InputArea.focus()
}
function LoadImeTable() {};
function showtip(n){
	document.getElementById("tips").innerHTML=n;
}
function killErrors(){
	return true;
}
//window.onerror =killErrors;

function btnclick(k){
	IME.InputArea.focus();
	var e=[];
	e.which=false;
	e.keyCode=k;
	ImeKeyPress(e);
	ImeKeyDown(e);
	IME.InputArea.focus();
}
function copyCode(id){
	var testCode=document.getElementById(id).value;
	blackberry.clipboard.setText(testCode);
	showtip('\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f');
}

function resizeinput(){
var _top=document.getElementById("box").offsetHeight;
var _bot=document.getElementById("bott").offsetHeight;
var _height=window.screen.availHeight;
var _newheight=_height-_top-_bot-300 + "px";
document.getElementById("InputArea").style.height=_newheight;
}


function emptyCode(id)
{
		document.getElementById(id).value='';
		document.getElementById(id).select();
}