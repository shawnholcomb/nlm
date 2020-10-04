mybutton = document.getElementById("top-btn");

window.onscroll = function () { scrollFunction() };

document.getElementById("phone").addEventListener("input", function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
});

$("#form-submit").on("click", function (event) {
    event.preventDefault();

    var data = {
        companyName: document.getElementById("companyName").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    }

    var formValid = validateForm(data);

    if (formValid) {
        $.ajax({
            type: "POST",
            url: "/email",
            data: data,
            success: function (res) {
                alert("you submitted a form")
                document.getElementById("companyName").value = "";
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("phone").value = "";
                // $(".email-form").hide();
                // $(".form-confirm").text("Your information has been submitted");

            },
            error: function (err) {
                alert("error")
                document.getElementById("companyName").value = "";
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("phone").value = "";
            }
        });
    } else {
        console.log("form not valid")
    }
});

$("#menu a").on("click", function () {
    $("#menuToggle input").prop("checked", false);
})

$("#menuToggle").on("click", function () {
    if ($("#menuInput").is(":checked")) {
        console.log("checked")
        $("html, body").css({
            overflow: "hidden"
        });
    } else {
        $("html, body").css({
            overflow: "scroll"
        });
    }
})

function validateForm(data) {
    var valid = true;

    if ((data.companyName == "") || (!data.companyName)) {
        document.getElementById("companyName").classList.add("form-error");
        valid = false;
    } else {
        document.getElementById("companyName").classList.remove("form-error");
    };

    if ((data.name == "") || (!data.name)) {
        document.getElementById("name").classList.add("form-error");
        valid = false;
    } else {
        document.getElementById("name").classList.remove("form-error");
    };

    if ((data.email == "") || (!data.email)) {
        document.getElementById("email").classList.add("form-error");
        valid = false;
    } else {
        var emailIsValid = validateEmail(data.email);

        if (!emailIsValid) {
            document.getElementById("email").classList.add("form-error");
            valid = false;
        } else {
            document.getElementById("email").classList.remove("form-error");
        }
    };

    if ((data.phone == "") || (!data.phone)) {
        document.getElementById("phone").classList.add("form-error");
        valid = false;
    } else {
        var phoneIsValid = validatePhone(data.phone);

        if (!phoneIsValid) {
            document.getElementById("phone").classList.add("form-error");
            valid = false;
        } else {
            document.getElementById("phone").classList.remove("form-error");
        }
    };

    return valid;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhone(num) {
    var re = /^\(?\d{3}?\)\ ?\-?\d{3}?\-?\d{4}?$/;
    return re.test(num);
}

function scrollFunction() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "flex";
    } else {
        mybutton.style.display = "none";
    }
    
    // if (vw > 425) {
    //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //         mybutton.style.display = "flex";
    //     } else {
    //         mybutton.style.display = "none";
    //     }
    // } else {
    //     mybutton.style.display = "none";
    // }
}

function topFunction() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
};