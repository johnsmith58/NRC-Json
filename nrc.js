var _displayEle = false;
var nrc_box = false;

$(document).ready(function(){

    getNRCJSON();

    $('.nrc .nrc-number').change(function(){
        getNRCJSON($(this).val());
    });

    $(".nrc .nrc-no").keypress(function(event) {
        return /\d/.test(String.fromCharCode(event.keyCode));
    });

    var minLength = 6;
    var maxLength = 6;
    $(".nrc .nrc-no").on('keydown keyup change', function(){
        var char = $(this).val();
        var charLength = $(this).val().length;
        if(charLength < minLength){
            $('.nrc .nrc-no').addClass("nrc-error");
        }else if(charLength = maxLength){
            $('.nrc .nrc-no').removeClass("nrc-error");
            $(this).val(char.substring(0, maxLength));
        }else{
            $('.nrc .nrc-no').removeClass("nrc-error");
        }
    });
    $(".nrc .submit").click(function(){
       if($(".nrc-no").val().length == 6){
        var nrc_number = $(".nrc .nrc-number").val();
        var nrc_char = $(".nrc .nrc-chars").val();
        var nrc_type =  $(".nrc .nrc-type").val();
        var nrc_no = $(".nrc-no").val();
        $(_displayEle).val(nrc_number + '/' + nrc_char + '(' + nrc_type + ')' + nrc_no);
        $(".nrc").hide();
        $('.nrc .nrc-no').val(' ');
       }else{
        $('.nrc .nrc-no').addClass("error");
       }
    });
    $(".submit-cancel").click(function(){
        $(".nrc").hide();
    });
});

function showNRCBox(displayLabel, nrcVal){
    _displayEle = displayLabel;
    $(".nrc").show();
    var mySplits = nrcVal.split(/[.,\/()-]/);
    $('.nrc .nrc-number').val(mySplits[0]);
    getNRCJSON(mySplits[0], mySplits[1]);
    $('.nrc .nrc-type').val(mySplits[2]);
    $('.nrc .nrc-no').val(mySplits[3]);
}

function getNRCJSON(key, autoSelKey){
    if(typeof(key) == 'undefined') key = '';
        $.ajax({
        type: 'POST',
        url: 'nrc_ajax.php',
        cache: false,
        data: {
            key: key
        },
        dataType: 'json'
    }).done(function (data) {
        if(key == ''){
            $(".nrc .nrc-number option").remove();
            $.each(data.numbers, function(key, val){
                $(".nrc-number").append("<option value='" + val + "'>" + val + '/' + "</option>");
            });
            $(".nrc .nrc-type option").remove();
            $.each(data.types, function(key, val){
                $(".nrc-type").append("<option value='" + val +"'>" + '(' + val + ')' + "</option>");
            });
            $('.nrc .nrc-number').change();
        } else {
            $(".nrc .nrc-chars option").remove();
            $.each(data, function(key, val){
                $(".nrc .nrc-chars").append("<option>" + val + "</option>");
            });
            if(typeof(autoSelKey) != 'undefined'){
            $(".nrc .nrc-chars").val(autoSelKey);
            }
        }
    });
};