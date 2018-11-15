function editItem(btn) {
    var id = $(btn).data("edit");
    var value = $(btn).data("value");
    var input = $("#" + id);
    if (input.prop("disabled")) {
        input.removeAttr("disabled");
    } else {
        $.confirm({
            title: 'Edit Changes ?!',
            content: 'You are about to change this user are you sure?',
            buttons: {
                confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-green',
                    action: function () {
                        $.alert('Confirmed!');
                        input.attr("disabled", "disabled");
                        var username = input.val();
                        var url = "/admin/uEdit";
                        var data = {
                            id: value,
                            username: username
                        }
                        //data = JSON.stringify(data);
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            success: function (res) {
                                window.location.href = "/admin";
                            },
                            dataType: "json"
                        });
                    }
                },
                cancel: {
                    text: 'Close',
                    btnClass: 'btn-red',
                    action: function () {
                        $.alert('Canceled!');
                        input.attr("disabled", "disabled");
                    }
                }
            }
        });

    }
}

function ceditItem(btn) {
    var id = $(btn).data("edit");
    var value = $(btn).data("value");
    var input = $("#" + id);
    if (input.prop("disabled")) {
        input.removeAttr("disabled");
    } else {
        $.confirm({
            title: 'Edit Changes ?!',
            content: 'You are about to change this user are you sure?',
            buttons: {
                confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-green',
                    action: function () {
                        $.alert('Confirmed!');
                        input.attr("disabled", "disabled");
                        var username = input.val();
                        var url = "/admin/cEdit";
                        var data = {
                            id: value,
                            username: username
                        }
                        //data = JSON.stringify(data);
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            success: function (res) {
                                window.location.href = "/admin";
                            },
                            dataType: "json"
                        });
                    }
                },
                cancel: {
                    text: 'Close',
                    btnClass: 'btn-red',
                    action: function () {
                        $.alert('Canceled!');
                        input.attr("disabled", "disabled");
                    }
                }
            }
        });

    }
}

function delItem(btn) {

    var value = $(btn).data("value");
    $.confirm({
        title: 'Delete User ?!',
        content: 'You are about to delete this user , are you sure?',
        buttons: {
            confirm: {
                text: 'Confirm',
                btnClass: 'btn-red',
                action: function () {
                    $.alert('Confirmed!');
                    var url = "/admin/udel";
                    var data = {
                        id: value
                    }
                    //data = JSON.stringify(data);
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: data,
                        success: function (res) {
                            window.location.href = "/admin";
                        },
                        dataType: "json"
                    });
                }
            },
            cancel: {
                text: 'Close',
                btnClass: 'btn-green',
                action: function () {
                    $.alert('Canceled!');
                }
            }
        }
    });
}
    function pdeleItem(btn) {
        var value = $(btn).data("value");
        $.confirm({
            title: 'Delete Post ?!',
            content: 'You are about to delete this post , are you sure?',
            buttons: {
                confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-red',
                    action: function () {
                        $.alert('Confirmed!');
                        var url = "/admin/pdel";
                        var data = {
                            id: value
                        }
                        //data = JSON.stringify(data);
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: data,
                            success: function (res) {
                                window.location.href = "/admin";
                            },
                            dataType: "json"
                        });
                    }
                },
                cancel: {
                    text: 'Close',
                    btnClass: 'btn-green',
                    action: function () {
                        $.alert('Canceled!');
                    }
                }
            }
        });
    

}