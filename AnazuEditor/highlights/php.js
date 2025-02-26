window.highlightRules = window.highlightRules || {};
window.highlightRules['.php'] = function(content) {
    const rules = [
        { pattern: /\b(function|echo|class|public|private)\b/g, style: 'color: #569cd6' },
        { pattern: /<\?php|\?>/g, style: 'color: #d7ba7d' }
    ];
    let result = content;
    rules.forEach(rule => {
        result = result.replace(rule.pattern, match => `<span style="${rule.style}">${match}</span>`);
    });
    return result;
};