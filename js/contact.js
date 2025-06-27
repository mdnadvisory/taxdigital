(function ($) {
  'use strict';

  const form = $('.contact__form');
  const message = $('.contact__msg');

  function done_func(response) {
    message.fadeIn().removeClass('alert-danger').addClass('alert-success');
    message.text("✅ Message sent successfully!");
    setTimeout(() => message.fadeOut(), 3000);
    form.find('input:not([type="submit"]), textarea').val('');
  }

  function fail_func(data) {
    message.fadeIn().removeClass('alert-success').addClass('alert-danger');
    message.text("❌ Failed to send message. Please try again.");
    setTimeout(() => message.fadeOut(), 3000);
  }

  form.submit(function (e) {
    e.preventDefault();
    const form_data = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: form_data,
      dataType: 'json',
      headers: {
        'Accept': 'application/json'
      }
    })
    .done(done_func)
    .fail(fail_func);
  });

})(jQuery);
