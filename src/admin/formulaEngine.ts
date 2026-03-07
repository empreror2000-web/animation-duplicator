/**
 * Safe formula engine — NO eval().
 * Supports: +, -, *, /, %, (, ), variable names, numbers.
 * Example formula block:
 *   vatAmount = price * vat / 100
 *   total = price + vatAmount
 */

type Vars = Record<string, number>;

// Tokenizer
type Token =
  | { type: "num"; value: number }
  | { type: "var"; value: string }
  | { type: "op"; value: string }
  | { type: "paren"; value: string };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (/[0-9.]/.test(ch)) {
      let num = "";
      while (i < expr.length && /[0-9.]/.test(expr[i])) { num += expr[i]; i++; }
      tokens.push({ type: "num", value: parseFloat(num) });
      continue;
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let name = "";
      while (i < expr.length && /[a-zA-Z_0-9]/.test(expr[i])) { name += expr[i]; i++; }
      tokens.push({ type: "var", value: name });
      continue;
    }
    if ("+-*/%".includes(ch)) { tokens.push({ type: "op", value: ch }); i++; continue; }
    if ("()".includes(ch)) { tokens.push({ type: "paren", value: ch }); i++; continue; }
    i++; // skip unknown
  }
  return tokens;
}

// Recursive descent parser
function parseExpr(tokens: Token[], pos: { i: number }, vars: Vars): number {
  let left = parseTerm(tokens, pos, vars);
  while (pos.i < tokens.length && tokens[pos.i].type === "op" && (tokens[pos.i].value === "+" || tokens[pos.i].value === "-")) {
    const op = tokens[pos.i].value; pos.i++;
    const right = parseTerm(tokens, pos, vars);
    left = op === "+" ? left + right : left - right;
  }
  return left;
}

function parseTerm(tokens: Token[], pos: { i: number }, vars: Vars): number {
  let left = parseFactor(tokens, pos, vars);
  while (pos.i < tokens.length && tokens[pos.i].type === "op" && ("*/%".includes(String(tokens[pos.i].value)))) {
    const op = String(tokens[pos.i].value); pos.i++;
    const right = parseFactor(tokens, pos, vars);
    if (op === "*") left *= right;
    else if (op === "/") left = right !== 0 ? left / right : 0;
    else left = right !== 0 ? left % right : 0;
  }
  return left;
}

function parseFactor(tokens: Token[], pos: { i: number }, vars: Vars): number {
  if (pos.i >= tokens.length) return 0;
  const t = tokens[pos.i];
  if (t.type === "num") { pos.i++; return t.value; }
  if (t.type === "var") { pos.i++; return vars[t.value] ?? 0; }
  if (t.type === "paren" && t.value === "(") {
    pos.i++;
    const val = parseExpr(tokens, pos, vars);
    if (pos.i < tokens.length && tokens[pos.i].type === "paren" && tokens[pos.i].value === ")") pos.i++;
    return val;
  }
  // Handle unary minus
  if (t.type === "op" && t.value === "-") {
    pos.i++;
    return -parseFactor(tokens, pos, vars);
  }
  pos.i++;
  return 0;
}

function evaluateExpression(expr: string, vars: Vars): number {
  const tokens = tokenize(expr);
  const pos = { i: 0 };
  return parseExpr(tokens, pos, vars);
}

/**
 * Execute a formula block. Each line: `varName = expression`
 * Returns all computed variables.
 */
export function executeFormulas(formulaBlock: string, inputs: Vars): Vars {
  const vars: Vars = { ...inputs };
  const lines = formulaBlock.split("\n").map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    const eqIdx = line.indexOf("=");
    if (eqIdx === -1) continue;
    const varName = line.slice(0, eqIdx).trim();
    const expr = line.slice(eqIdx + 1).trim();
    if (!varName || !expr) continue;
    vars[varName] = evaluateExpression(expr, vars);
  }

  return vars;
}
