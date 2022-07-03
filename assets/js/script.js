// Main Carousel
createCarousel(".main-carousel", { items: 2 });

// Join Mailing List
document.getElementById("mailingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  try {
    const errors = validateForm([...this.elements]);
    if (errors) return;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    alert(`${data.email} has added to our list`);
    e.target.reset();
    console.log(data);
  } catch (error) {
    console.log(error);
    alert("An error occurred");
  }
});

function validateForm(elements) {
  const errors = {};

  elements.forEach((formElement) => {
    const isValid = formElement.checkValidity();
    formElement.classList.remove("input--variant-error");

    if (formElement.nextElementSibling) {
      formElement.nextElementSibling.remove();
    }

    if (!isValid) {
      errors[formElement.name] = formElement.validationMessage;
      const errorElement = document.createElement("small");
      errorElement.classList.add("input__error-text");
      errorElement.innerText = formElement.validationMessage;
      formElement.insertAdjacentElement("afterend", errorElement);
      formElement.classList.add("input--variant-error");
    }
  });

  if (!Object.keys(errors).length) {
    return null;
  }
  return errors;
}
