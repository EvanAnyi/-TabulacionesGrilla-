document.addEventListener("DOMContentLoaded", function () {
    const nextButtons = document.querySelectorAll('.next-button');
    const backButtons = document.querySelectorAll('.back-button');
    const formContainers = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progress-bar');
    const resultContainer = document.getElementById('result-container');
    const confirmButton = document.getElementById('confirm-button');
    const totalResults = {};
    
    function validateAndContinue() {
        // Obtén los campos obligatorios
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const dniInput = document.getElementById('dni');

        // Realiza la validación
        if (!nombreInput.value || !apellidoInput.value || !dniInput.value) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        // Si pasa la validación, continúa al siguiente formulario
        const currentForm = document.querySelector('.form-step:not(.form-hidden)');
        if (currentForm) {
            goToNextForm(currentForm);
        } else {
            console.error('No se pudo encontrar el formulario actual.');
        }
    }

    function showForm(formId) {
        formContainers.forEach(container => container.style.display = 'none');

        const currentContainer = document.getElementById(formId);
        if (currentContainer) {
            currentContainer.style.display = 'block';
        } else {
            console.error(`No se pudo encontrar el contenedor del formulario con ID ${formId}`);
        }

        updateProgressBar(formId);
    }

    function updateProgressBar(formId) {
        const steps = Array.from(formContainers);
        const currentStep = steps.findIndex(step => step.id === formId) + 1;

        const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;
        progressBar.style.width = `${progressWidth}%`;
    }

    function goToNextForm(currentForm) {
        const nextFormId = currentForm.getAttribute('data-next-form');
        if (nextFormId) {
            showForm(nextFormId);
        } else {
            console.log('No se pudo encontrar el siguiente formulario.');
        }
    }

    function goToPreviousForm(currentForm) {
        const previousFormId = currentForm.getAttribute('data-previous-form');
        if (previousFormId) {
            showForm(previousFormId);
        } else {
            console.log('No se pudo encontrar el formulario anterior.');
        }
    }

    for (const nextButton of nextButtons) {
        nextButton.addEventListener('click', function () {
            const form = this.closest('.form-step');
            if (form) {
                if (form.id === 'form1') {
                    // Manejar el clic del checkbox en el formulario 1 y luego avanzar al siguiente formulario
                    handleForm1CheckboxClick(form);
                } else {
                    goToNextForm(form);
                }
            } else {
                console.error('No se pudo encontrar el formulario asociado al botón');
            }
        });
    }

    for (const backButton of backButtons) {
        backButton.addEventListener('click', function () {
            const form = this.closest('.form-step');
            if (form) {
                goToPreviousForm(form);
            } else {
                console.error('No se pudo encontrar el formulario asociado al botón');
            }
        });
    }

    showForm('form0');

    confirmButton.addEventListener('click', function () {
        showTotalResults();
    });

    const form13 = document.getElementById('form13');
    form13.addEventListener('submit', function (event) {
        event.preventDefault();
        collectAndDisplayResults(this);
    });

    function collectAndDisplayResults(form) {
        const formData = new FormData(form);
        let results = '<h3>Resultados</h3>';

        for (const pair of formData.entries()) {
            results += `<p><strong>${pair[0]}:</strong> ${pair[1]}</p>`;
            totalResults[pair[0]] = totalResults[pair[0]] ? totalResults[pair[0]] + Number(pair[1]) : Number(pair[1]);
        }

        resultContainer.innerHTML = results;
    }

    function showTotalResults() {
        console.log('Mostrando resultados...');
        let totalResultsHTML = '<h3>Resultados Detallados</h3>';
        let grandTotal = 0;
    
        totalResultsHTML += '<h4>A. Título</h4>';
        for (const [key, value] of Object.entries(totalResults)) {
            totalResultsHTML += `<p><strong>${key}:</strong> ${value}</p>`;
            grandTotal += value;
        }
    
        totalResultsHTML += '<h3>Resultado Final</h3>';
        totalResultsHTML += `<p><strong>Gran Total:</strong> ${grandTotal}</p>`;
    
        resultContainer.innerHTML = totalResultsHTML;
    
        confirmButton.style.display = 'none';
    }

    function submitForm() {
        const coloquioFrenteTribunalCheckbox = document.getElementById('coloquioFrenteTribunal');
        const resultContainer = document.getElementById('result-container');
        const confirmButton = document.getElementById('confirm-button');

        const resultadoColoquio = coloquioFrenteTribunalCheckbox.checked ? 10 : 0;

        resultContainer.innerHTML = `<p>Resultado del Coloquio: ${resultadoColoquio}</p>`;
        resultContainer.style.display = 'block';

        confirmButton.style.display = 'block';

        return false;
    }

    const form1 = document.getElementById('form1');
    form1.addEventListener('submit', function (event) {
        event.preventDefault();
        collectAndDisplayResults(this);
        calculateAndShowTotalATitulo();
        goToNextForm(this);
    });

    function handleForm1CheckboxClick(form) {
        // Lógica para manejar el clic del checkbox en el formulario 1
        // Puedes agregar lógica adicional aquí si es necesario

        // Después, avanza al siguiente formulario
        goToNextForm(form);
    }

    function calculateAndShowTotalATitulo() {
        const checkboxesValues = {
            'aprofesor1': 16,
            'aprofesor2': 16,
            'aprofesor3': 12,
            'aprofesor4': 10
        };

        let totalATitulo = 0;

        for (const checkboxId in checkboxesValues) {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox.checked) {
                totalATitulo += checkboxesValues[checkboxId];
            }
        }

        const totalATituloResult = document.getElementById('totalATituloResult');
        totalATituloResult.textContent = totalATitulo;
    }
});
