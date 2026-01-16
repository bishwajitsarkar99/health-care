export const handleMaskOnFocusBlur = (selector) => {
    let parent = document;
    $(document).on('focus', selector, function () {
        $(this).inputmask("+(880)-9999-999999");
    });

    $(document).on('blur', selector, function () {
        $(this).inputmask('remove');
    });
}

handleMaskOnFocusBlur(".contract");