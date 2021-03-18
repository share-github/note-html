(function () {
    /**
     * What to write down.
     * ex) const note = `sample text.`;
     *     const note = `sample\ntext.`;
     *     const note = `sample
     *     text.`;
     */
    const note = ``;

    /**
     * If necessary, write the character style.
     * ex) const blockStyle = 'border:1px solid red;';
     */
    const blockStyle = '';

    /**
     * If necessary, write the character style.
     * ex) const characterStyle = 'color: red;';
     *     const characterStyle = 'font-weight: bold;';
     */
    const characterStyle = '';

    const content = `
        <div style="${blockStyle}">
          <pre style="${characterStyle}">${note}</pre>
        </div>
    `;

    document.write(content);
})();