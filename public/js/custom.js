(async () => {
  //   const res = await fetch("/skill/get");
  //   const skills = await res.json();
  //   console.log(skills);

  $.get("/skill/get", (skills) => {
    var skillSection = document.getElementById("skill-setion");
    skillSection.innerHTML = "";
    for (skill of skills) {
      console.log(skill);
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
