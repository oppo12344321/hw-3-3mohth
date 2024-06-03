document.querySelector('form').onsubmit = (event) => {
  event.preventDefault();
  const cityName = document.querySelector('input').value.trim();
  const outputSection = document.querySelector('section');

  if (cityName) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=7013c0154c9a44a892430916230407&q=${cityName}`)
      .then(response => {
        if (!response.ok) {
          outputSection.innerHTML = `<p>Такого города не существует</p>`;
          return Promise.reject();
        }
        return response.json();
      })
      .then(data => {
        outputSection.innerHTML = `
          <h2>Название страны: ${data.location.country}</h2>
          <h2>Название города: ${data.location.region}</h2>
          <h2>Температура: ${data.current.temp_c} градусов</h2>
          <h2>Скорость ветра: ${data.current.wind_kph} км/час</h2>
          <img src="http:${data.current.condition.icon}" alt="Weather icon">
        `;
      })
      .catch(() => {
        if (!outputSection.innerHTML.includes('Такого города не существует')) {
          outputSection.innerHTML = `<p>Произошла ошибка при получении данных</p>`;
        }
      });
  } else {
    outputSection.innerHTML = `<p>Пожалуйста, введите название города.</p>`;
  }
};
