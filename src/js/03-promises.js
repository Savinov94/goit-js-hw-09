document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const delayInput = form.querySelector('input[name="delay"]');
  const stepInput = form.querySelector('input[name="step"]');
  const amountInput = form.querySelector('input[name="amount"]');

  async function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        const promiseResult = { position, delay };

        if (shouldResolve) {
          resolve(promiseResult);
        } else {
          reject(promiseResult);
        }
      }, delay);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let delay = parseInt(delayInput.value);
    const step = parseInt(stepInput.value);
    const amount = parseInt(amountInput.value);

    if (isNaN(delay) || isNaN(step) || isNaN(amount) || delay < 0 || step < 0 || amount <= 0) {
      alert('Please enter valid values for delay, step, and amount.');
      return;
    }

    for (let i = 1; i <= amount; i++) {
      try {
        const result = await createPromise(i, delay);
        console.log(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
      } catch (error) {
        console.log(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
      }

      delay += step;
    }
  });
});