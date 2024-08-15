import './password-strength.scss';

export default function PasswordStrength({ password }: { password: string }) {
  function testPasswordStrength(password: string) {
    if (!password) return 0;

    const tests = [
      /(?=.*\d)/g,
      /(?=.*[A-Z])/g,
      /(?=.*[a-z])/g,
      /(?=.*[@$!%*?&])/g,
    ];
    const results = tests.map((test) => test.test(password));
    return results.filter((result) => result).length;
  }

  const classes = ['empty', 'low', 'low', 'medium', 'high'];

  return (
    <div
      className={`password-strength ${classes[testPasswordStrength(password)]}`}
    >
      <div className="password-strength__strength"></div>
      <div className="password-strength__strength"></div>
      <div className="password-strength__strength"></div>
    </div>
  );
}
