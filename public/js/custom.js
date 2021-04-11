(async () => {
  //   const res = await fetch("/skill/get");
  //   const skills = await res.json();
  //   console.log(skills);

  $.get("/skill/get", (skills) => {
    var skillSection = document.getElementById("skill-setion");
    skillSection.innerHTML = "";

    for (skill of skills) {
      skillSection.innerHTML += `
            <div class="skill">
                <span class="chart" data-percent="${skill.percent}">
                    <span class="percent">${skill.percent}</span>
                    <canvas height="152" width="152"></canvas>
                </span>
                <h4>${skill.name}</h4>
                <p>${skill.desc}</p>
            </div>
        `;
    }

    // now configure owl carousel

    $(".owl-carousel").owlCarousel({
      loop: true,
      items: 3,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 4,
        },
      },
    });
  });
})();

// send Message
$("#sendMessage").click((event) => {
  // grave all value
  event.preventDefault();

  var name = $("#name").val();
  var email = $("#email").val();
  var subject = $("#subject").val();
  var message = $("#message").val();

  // show message

  if (name == "") {
    $(".msg").html(
      '<div class="alert alert-danger text-left"> <strong>Error :</strong> Please Type name</div>'
    );
  } else if (email == "") {
    $(".msg").html(
      '<div class="alert alert-danger text-left"> <strong>Error :</strong> Please type a valid email</div>'
    );
  } else if (subject == "") {
    $(".msg").html(
      '<div class="alert alert-danger text-left"> <strong>Error :</strong> Please type a subject</div>'
    );
  } else if (message == "") {
    $(".msg").html(
      '<div class="alert alert-danger text-left"> <strong>Error :</strong> Please type a message</div>'
    );
  } else {
    // hide previous error
    $(".msg").html("");
    /// send message
    $.post("/admin/message", { name, email, subject, message }, (res) => {
      if (res.success) {
        $(".msg").html(
          '<div class="alert alert-success text-left"> <strong>Success :</strong> message sent successfully </div>'
        );
      } else {
        $(".msg").html(
          '<div class="alert alert-danger text-left"> <strong>Error :</strong> message not sent</div>'
        );
      }

      setTimeout(() => {
        $(".msg").fadeOut(500);
      }, 4000);

      // reset Form
      $("#name").val("");
      $("#email").val("");
      $("#subject").val("");
      $("#message").val("");
    });
  }
});

// show Product

var stringTruncate = function (str, length) {
  var dots = str.length > length ? "..." : "";
  return str.substring(0, length) + dots;
};

(() => {
  // fetch Product
  $.get("/project/get", (res) => {
    // array reverse
    var projects = document.getElementById("projects");
    projects.innerHTML = "";
    if (res.length > 0) {
      // if data found show data
      for (project of res) {
        projects.innerHTML += `
        <div class="col-md-4">
					<div class="card">
						<img style="min-height:250px;max-height:250px" src="${
              project.thumbnail
            }" class="card-img-top">
						<div class="card-body">
							<div class="card-title">
							${project.projectName}
							</div>
							<p>
							${stringTruncate(project.projectDesc, 100)}
							</p>
							<a id="liveDemoBtn" class="btn btn-block" href="${project.link}">Live Demo</a>
						</div>
					</div>
				</div>
      `;
      }
    } else {
      // No Data Found !
    }
  });
})();
