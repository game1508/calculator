class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentValue = '';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Number buttons
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleNumber(btn.dataset.number));
        });

        // Operator buttons
        document.querySelectorAll('.operator-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleOperator(btn.dataset.operator));
        });

        // Equals button
        document.getElementById('equals').addEventListener('click', () => this.calculate());

        // Clear button
        document.getElementById('clear').addEventListener('click', () => this.clear());

        // Delete button
        document.getElementById('delete').addEventListener('click', () => this.delete());

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleNumber(num) {
        // Prevent multiple decimal points
        if (num === '.' && this.currentValue.includes('.')) {
            return;
        }

        // Reset display after operation
        if (this.shouldResetDisplay) {
            this.currentValue = '';
            this.shouldResetDisplay = false;
        }

        this.currentValue += num;
        this.updateDisplay();
    }

    handleOperator(op) {
        // If there's already an operation pending, calculate first
        if (this.operation !== null && this.currentValue !== '') {
            this.calculate();
        }

        this.previousValue = this.currentValue || '0';
        this.operation = op;
        this.shouldResetDisplay = true;
    }

    calculate() {
        if (this.operation === null || this.currentValue === '') {
            return;
        }

        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current === 0 ? 'Error' : prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        this.currentValue = result.toString();
        this.operation = null;
        this.previousValue = '';
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = this.currentValue || '0';
    }

    handleKeyboard(e) {
        const key = e.key;

        // Numbers
        if (key >= '0' && key <= '9') {
            this.handleNumber(key);
        }
        // Decimal point
        else if (key === '.') {
            this.handleNumber('.');
        }
        // Operators
        else if (key === '+' || key === '-' || key === '*' || key === '/') {
            e.preventDefault();
            this.handleOperator(key);
        }
        // Equals
        else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            this.calculate();
        }
        // Clear
        else if (key === 'Escape') {
            this.clear();
        }
        // Delete
        else if (key === 'Backspace') {
            e.preventDefault();
            this.delete();
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});