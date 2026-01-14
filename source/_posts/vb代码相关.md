---
title: vb代码相关
date: 2024/11/07
abbrlink: cc70b376
---

## httpGet

```vb
Private Function HttpGet(ByVal URL As String) As String
    On Error GoTo errormsg
    Dim HTTP As MSXML2.ServerXMLHTTP

    Set HTTP = CreateObject("Msxml2.ServerXMLHTTP.6.0")
    HTTP.Open "GET", URL, False

    HTTP.send

    If HTTP.Status = 200 Then
        HttpGet = HTTP.responseText
    Else
        HttpGet = "推送出错:" & HTTP.Status
    End If
errormsg:
    HttpGet = "推送出错，请重试！"
End Function
```

## httpPost

```vb
Function HttpPost(Url As String, PostMsg As String) As String
    On Error GoTo er
    Dim XMLHTTP As Object
    Set XMLHTTP = CreateObject("Msxml2.XMLHTTP")
    If Not IsObject(XMLHTTP) Then
        Set XMLHTTP = CreateObject("Microsoft.XMLHTTP")
        If Not IsObject(XMLHTTP) Then Exit Function
    End If
    XMLHTTP.Open "POST", Url, False
    XMLHTTP.SetRequestHeader "CONTENT-TYPE", "application/json"
    'XMLHTTP.send PostMsg
'    XMLHTTP.send UTF8EncodeURI(PostMsg)
    XMLHTTP.send PostMsg

    Do While XMLHTTP.ReadyState <> 4
        DoEvents
    Loop

    If XMLHTTP.Status = 200 Then
        HttpPost = XMLHTTP.ResponseText
    Else
        HttpPost = "400"
    End If

    Exit Function
er:
'        MsgBox "POST false"
    HttpPost = "false"
End Function
```
