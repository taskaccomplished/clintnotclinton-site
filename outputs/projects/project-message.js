const messageForm = document.querySelector('#project-message-form');
if (messageForm) {
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageForm.elements.body;
    if (!message.value.trim()) {
      message.setCustomValidity('Please write a message first.');
      message.reportValidity();
      return;
    }
    const subject = encodeURIComponent(messageForm.elements.subject.value);
    const body = encodeURIComponent(message.value);
    window.location.href = `mailto:clint.morris64@gmail.com?subject=${subject}&body=${body}`;
  });
  messageForm.elements.body.addEventListener('input', () => {
    messageForm.elements.body.setCustomValidity('');
  });
}
