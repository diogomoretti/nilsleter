// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

        // Create the defaults once
        var pluginName = 'nilsleter',
            defaults = {
                token: '62bb61431348e22850828a5829c4373faafe29c1',
                modal: false
            };

        // The actual plugin constructor
        function Plugin ( element, options ) {
                this.element = element;
                this.settings = $.extend( {}, defaults, options );
                this._defaults = defaults;
                this._name = pluginName;
                this.init();
        }

        Plugin.prototype = {
                init: function () {

                        // Get values    
                        var $el      = $( this.element ),
                            settings = this.settings;

                        // Labels
                        label = {
                            title:   'nilsleter',
                            nome:    'Nome',
                            email:   'E-mail',
                            estado:  'Estado',
                            nivel:   'Nível',
                            escolha: 'Escolha'
                        },

                        // Form
                        form_open =  '<form class="form-horizontal nl-form-item" role="form">';
                        form_title = '<h1>'+label.title+'</h1>';

                        form_name  = ' <div class="form-group">';
                        form_name += '  <label for="nl-input-nome" class="col-sm-3 control-label">'+label.nome+'</label>';
                        form_name += '    <div class="col-sm-9">';
                        form_name += '      <input type="text" class="form-control" id="nl-input-nome" value="Name Test" placeholder="'+label.nome+'">';
                        form_name += '    </div>';
                        form_name += ' </div>';

                        form_email  = ' <div class="form-group">';
                        form_email += '  <label for="nl-input-email" class="col-sm-3 control-label">'+label.email+'</label>';
                        form_email += '    <div class="col-sm-9">';
                        form_email += '      <input type="email" class="form-control" id="nl-input-email" value="d@c.com" placeholder="'+label.email+'">';
                        form_email += '    </div>';
                        form_email += ' </div>';

                        form_estado  = ' <div class="form-group">';
                        form_estado += '  <label for="nl-select-estado" class="col-sm-3 control-label">'+label.estado+'</label>';
                        form_estado += '    <div class="col-sm-9">';
                        form_estado += '      <select class="form-control" id="nl-select-estado">';
                        form_estado += '      <option>-- '+label.escolha+' seu '+label.estado+' --</option>';
                        $.each(settings.fields.estado, function( index, value ) {form_estado += '<option>'+value+'</option>';});
                        form_estado += '      </select>';
                        form_estado += '    </div>';
                        form_estado += ' </div>';

                        form_nivel  = ' <div class="form-group">';
                        form_nivel += '  <label for="nl-select-nivel" class="col-sm-3 control-label">'+label.nivel+'</label>';
                        form_nivel += '    <div class="col-sm-9">';
                        form_nivel += '      <select class="form-control" id="nl-select-nivel">';
                        form_nivel += '      <option>-- '+label.escolha+' seu '+label.nivel+' --</option>';
                        $.each(settings.fields.nivel, function( index, value ) {form_nivel += '<option>'+value+'</option>';});
                        form_nivel += '      </select>';
                        form_nivel += '    </div>';
                        form_nivel += ' </div>';

                        form_submit  = '<div class="form-group">';
                        form_submit += '  <div class="col-sm-5 col-sm-offset-3 loading-box">';
                        form_submit += '    <span class="loading-item"></span>';
                        form_submit += '  </div>';
                        form_submit += '  <div class="col-sm-4">';
                        form_submit += '    <button type="submit" class="btn btn-success btn-lg pull-right nl-btn-submit">Enviar</button>';
                        form_submit += '  </div>';
                        form_submit += '</div>';

                        form_close = '</form>';

                        // Form Modal
                        modal_open  = '<div class="modal fade" id="nilsleter-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
                        modal_open += '  <div class="modal-dialog">';
                        modal_open += '    <div class="modal-content">';

                        modal_header  = '<div class="modal-header">';
                        modal_header += '  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
                        modal_header += '  <h4 class="modal-title">'+label.title+'</h4>';
                        modal_header += '</div>';

                        modal_content_open  = '<div class="modal-body">';
                        modal_content_close = '</div>';

                        modal_close = '</div></div></div>';

                        // Concat var for form
                        btnModal = '<button class="btn btn-success btn-lg" data-toggle="modal" data-target="#nilsleter-modal">Quero receber novidades</button>';
                        formFull  = null;
                        formInner = form_open + form_name + form_email + form_estado + form_nivel + form_submit + form_close;

                        formItemPage  = form_open + form_title + form_name + form_email + form_estado + form_nivel + form_submit + form_close;
                        formItemModal = modal_open + modal_header + modal_content_open + formInner + modal_content_close + modal_close;

                        if (settings.modal) {
                            formFull = formItemModal;
                        } else {
                            formFull = formItemPage;
                            btnModal = null;
                        }

                        // Make Form
                        this.makeForm($el, formFull, btnModal);

                        // Submit form
                        $el.find('.nl-form-item').submit( this.submitForm );
                },

                makeForm: function ( element, form, btnModal ) {
                        element.append(btnModal);
                        element.append(form);
                },

                submitForm: function( e ) {
                        e.preventDefault();

                        // Get form values
                        nomeValue   = $('#nl-input-nome').val();
                        emailValue  = $('#nl-input-email').val();
                        estadoValue = $('#nl-select-estado').val();
                        nivelValue  = $('#nl-select-nivel').val();

                        formValido = false;

                        $('.loading-item').text('Sending...');

                        $('.nl-btn-submit').attr('disabled','disabled');

                        // Validate
                        $('.nl-form-item input').map(function() {
                            if ($(this).val().length === 0) {
                                $(this).parents('.form-group').addClass('has-error');
                                formValido = false;
                            } else {
                                $(this).parents('.form-group').removeClass('has-error');
                                formValido = true;
                            }
                        });

                        // Form validate
                        if (formValido) {
                            dados = JSON.stringify({
                                token:  $.md5(nomeValue),
                                secret: $.md5(emailValue),
                                nome:   nomeValue,
                                email:  emailValue,
                                estado: estadoValue,
                                nivel:  nivelValue
                            });
                            Plugin.prototype.sendData(dados);
                        }
                },

                sendData: function ( dados ) {
                        console.log(dados);
                        $.ajax ({
                            type: 'GET',
                            url: '/sent/' + dados,
                            dataType: 'json',
                            success: function() {
                                $('.loading-item').addClass('loading-success').text('Success!');
                            },
                            error: function() {
                                $('.loading-item').addClass('loading-error').text('Error! Try again.');
                            }
                        });

                        setTimeout(function() {
                            $('.loading-item').removeClass('loading-error loading-success').text('');
                            $('.nl-btn-submit').removeAttr('disabled');
                        }, 3000);
                }
        };

        // Preventing against multiple instantiations
        $.fn[ pluginName ] = function ( options ) {
                return this.each(function() {
                        if ( !$.data( this, 'plugin_' + pluginName ) ) {
                                $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
                        }
                });
        };

})( jQuery, window, document );