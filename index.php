<script src="jquery-2.1.3.min.js"></script>

<link rel="stylesheet" href="style.css">
<div class="nrc-container-1">
    <label class="nrc-label">NRC Number -</label>
    <input type="text" class="nrc-numberVal-1" value="">
    <br><hr>
    <label class="nrc-label-2">NRC Number -</label>
    <input type="text" class="nrc-numberVal-2" value="">
</div>
<script>
    $(document).ready(function(){
        $('.nrc-numberVal-1').click(function(){
            showNRCBox('.nrc-numberVal-1', $(this).val());
        });
        $('.nrc-numberVal-2').click(function(){
            showNRCBox('.nrc-numberVal-2',  $(this).val());
        });
    });
</script>
<?php require("nrc_box.php") ?>