import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const result = await authService.registerAdmin({ fullName, email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const resendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.resendVerificationCode({ email });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const verify = async (req, res) => {
  try {
    const { email, code } = req.body;
    const result = await authService.verifyAdmin({ email, code });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginAdmin({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const requestReset = async (req, res) => {
  try {
    const result = await authService.requestPasswordReset(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const verifyReset = async (req, res) => {
  try {
    const result = await authService.verifyResetCode(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};