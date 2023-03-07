$(document).ready(() => {
    listContent()
})

$(function () {
    $('.add-btn').on('click', function() {
        $('.add-form').css('display', 'flex');
        $('.add-btn').hide();
    });
    $('.cancle-btn').on('click', function() {
        Confirm();
    })
});

function addContent() {
    let content = $('.cont').val();

    let formData = new FormData()
        formData.append("content_give", content)

        fetch('/post', {method: "POST",body: formData}).then(res => res.json()).then(data => {
            alert(data["msg"])
            window.location.reload()
    })
}

function listContent() {
    fetch("/list").then(res => res.json()).then(data => {
        let rows = data['result'];
        rows.forEach((row) => {
            let content = row['content']
            let _id = row['_id']
            let check = row['check']

            let txt_checked = ''
    
            if(check == 'true') {
                txt_checked = 'checked'
            }

            let temp_html = `
            <div id="${_id}" class="todo flex-row">
                <input ${txt_checked} type="checkbox" onchange="checkcontent('${_id}')">
                <span onclick="showUpdateForm('${_id}')" class="todo-content">${content}</span>
                <button class="delete-btn" onclick="deletecontent('${_id}')">삭제</button>
                <div class="todo-content-modify flex-row">
                    <input value= "${content}" type="text">
                    <button onclick="modifycontent('${_id}')">수정</button>
                    <button onclick="hideUpdateForm('${_id}')">취소</button>
                </div>
            </div>
            `
            $('.todos').append(temp_html);
        })
    })
}

function Confirm() {
    if(confirm("정말 취소할까요?")) {
        $('.add-form').hide();
        $('.add-btn').css('display', 'flex');
    } else {
        $('.add-form').css('display', 'flex');
        $('.add-btn').hide();
    }
}

function showUpdateForm(_id) {
    $(`#${_id} > span`).hide();
    $(`#${_id} > .todo-content-modify`).css('display', 'flex');
    $(`#${_id} > .delete-btn`).hide();
    $(`#${_id} > input`).hide();
}

function hideUpdateForm(_id) {
    $(`#${_id} > span`).show();
    $(`#${_id} > .todo-content-modify`).css('display', 'none');
    $(`#${_id} > .delete-btn`).show();
    $(`#${_id} > input`).show();
}

function modifycontent(_id) {
    let new_content = $(`#${_id}> .todo-content-modify > input`).val();
    let formData = new FormData()
    formData.append("id_give", _id)
    formData.append("content_give", new_content)

    fetch('/modify', {method: "POST",body: formData}).then(res => res.json()).then(data => {
        alert(data["msg"])
        window.location.reload()
    })
}

function deletecontent(_id) {
    let formData = new FormData()
    formData.append("id_give", _id)

    fetch('/delete', {method: "POST",body: formData}).then(res => res.json()).then(data => {
        alert(data["msg"])
        window.location.reload()
    })
}

function checkcontent(_id) {
    let is_checked = $(`#${_id} > input`).is(':checked');
    let formData = new FormData()
    formData.append("id_give", _id)
    formData.append("check_give", is_checked)

    fetch('/check', {method: "POST",body: formData}).then(res => res.json()).then(data => {
        // alert(data["msg"])
        // window.location.reload()
    })
}