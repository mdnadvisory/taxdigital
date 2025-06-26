(function ($) {
  'use strict';

  var form = $('.contact__form'),
      message = $('.contact__msg'),
      form_data;

  function done_func(response) {
    message.fadeIn().removeClass('alert-danger').addClass('alert-success');
    message.text("✅ Thank you for contacting us!");
    setTimeout(function () {
      message.fadeOut();
    }, 3000);
    form.find('input:not([type="submit"]), textarea').val('');
  }

  function fail_func(data) {
    message.fadeIn().removeClass('alert-success').addClass('alert-danger');
    message.text("❌ Submission failed. Please try again.");
    setTimeout(function () {
      message.fadeOut();
    }, 3000);
  }

  form.submit(function (e) {
    e.preventDefault();
    form_data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: form_data
    })
    .done(done_func)
    .fail(fail_func);
  });

})(jQuery);