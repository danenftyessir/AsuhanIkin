export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class Validator {
  static email(email: string): ValidationResult {
    const errors: string[] = [];

    if (!email || email.trim() === "") {
      errors.push("email wajib diisi");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("format email tidak valid");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static password(password: string): ValidationResult {
    const errors: string[] = [];

    if (!password || password.trim() === "") {
      errors.push("password wajib diisi");
    } else {
      if (password.length < 6) {
        errors.push("password minimal 6 karakter");
      }
      if (password.length > 50) {
        errors.push("password maksimal 50 karakter");
      }
      if (!/[A-Za-z]/.test(password)) {
        errors.push("password harus mengandung huruf");
      }
      if (!/[0-9]/.test(password)) {
        errors.push("password harus mengandung angka");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static phone(phone: string): ValidationResult {
    const errors: string[] = [];

    if (!phone || phone.trim() === "") {
      errors.push("nomor telepon wajib diisi");
    } else if (!/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(phone)) {
      errors.push("format nomor telepon tidak valid");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static required(value: any, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (value === null || value === undefined || value === "") {
      errors.push(`${fieldName} wajib diisi`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static minLength(
    value: string,
    minLength: number,
    fieldName: string
  ): ValidationResult {
    const errors: string[] = [];

    if (value && value.length < minLength) {
      errors.push(`${fieldName} minimal ${minLength} karakter`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static maxLength(
    value: string,
    maxLength: number,
    fieldName: string
  ): ValidationResult {
    const errors: string[] = [];

    if (value && value.length > maxLength) {
      errors.push(`${fieldName} maksimal ${maxLength} karakter`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static number(value: any, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (value !== null && value !== undefined && value !== "") {
      if (isNaN(Number(value))) {
        errors.push(`${fieldName} harus berupa angka`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static positiveNumber(value: any, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (value !== null && value !== undefined && value !== "") {
      const num = Number(value);
      if (isNaN(num)) {
        errors.push(`${fieldName} harus berupa angka`);
      } else if (num <= 0) {
        errors.push(`${fieldName} harus lebih dari 0`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static range(
    value: any,
    min: number,
    max: number,
    fieldName: string
  ): ValidationResult {
    const errors: string[] = [];

    if (value !== null && value !== undefined && value !== "") {
      const num = Number(value);
      if (isNaN(num)) {
        errors.push(`${fieldName} harus berupa angka`);
      } else if (num < min || num > max) {
        errors.push(`${fieldName} harus antara ${min} dan ${max}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static url(url: string): ValidationResult {
    const errors: string[] = [];

    if (url && url.trim() !== "") {
      try {
        new URL(url);
      } catch {
        errors.push("format url tidak valid");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static date(date: string, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (date && date.trim() !== "") {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        errors.push(`${fieldName} format tanggal tidak valid`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static futureDate(date: string, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (date && date.trim() !== "") {
      const dateObj = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(dateObj.getTime())) {
        errors.push(`${fieldName} format tanggal tidak valid`);
      } else if (dateObj < today) {
        errors.push(`${fieldName} tidak boleh tanggal masa lalu`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static combine(...results: ValidationResult[]): ValidationResult {
    const allErrors = results.flatMap((result) => result.errors);

    return {
      isValid: allErrors.length === 0,
      errors: allErrors,
    };
  }
}

export const validateInvestmentForm = (data: {
  title: string;
  description: string;
  location: string;
  roi: number;
  duration: number;
  minInvest: number;
  target: number;
  category: string;
}): ValidationResult => {
  return Validator.combine(
    Validator.required(data.title, "judul"),
    Validator.minLength(data.title, 10, "judul"),
    Validator.maxLength(data.title, 100, "judul"),
    Validator.required(data.description, "deskripsi"),
    Validator.minLength(data.description, 50, "deskripsi"),
    Validator.maxLength(data.description, 1000, "deskripsi"),
    Validator.required(data.location, "lokasi"),
    Validator.required(data.category, "kategori"),
    Validator.positiveNumber(data.roi, "roi"),
    Validator.range(data.roi, 1, 100, "roi"),
    Validator.positiveNumber(data.duration, "durasi"),
    Validator.range(data.duration, 1, 24, "durasi"),
    Validator.positiveNumber(data.minInvest, "minimal investasi"),
    Validator.positiveNumber(data.target, "target pendanaan")
  );
};

export const validateProductForm = (data: {
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  location: string;
  harvestDate: string;
}): ValidationResult => {
  return Validator.combine(
    Validator.required(data.name, "nama produk"),
    Validator.minLength(data.name, 5, "nama produk"),
    Validator.maxLength(data.name, 100, "nama produk"),
    Validator.required(data.description, "deskripsi"),
    Validator.minLength(data.description, 20, "deskripsi"),
    Validator.maxLength(data.description, 500, "deskripsi"),
    Validator.required(data.category, "kategori"),
    Validator.required(data.unit, "satuan"),
    Validator.required(data.location, "lokasi"),
    Validator.positiveNumber(data.price, "harga"),
    Validator.number(data.stock, "stok"),
    Validator.date(data.harvestDate, "tanggal panen")
  );
};

export const validateUserForm = (data: {
  name: string;
  email: string;
  phone: string;
  location: string;
  password?: string;
  confirmPassword?: string;
}): ValidationResult => {
  const results = [
    Validator.required(data.name, "nama"),
    Validator.minLength(data.name, 3, "nama"),
    Validator.maxLength(data.name, 50, "nama"),
    Validator.email(data.email),
    Validator.phone(data.phone),
    Validator.required(data.location, "lokasi"),
  ];

  if (data.password) {
    results.push(Validator.password(data.password));
  }

  if (data.confirmPassword && data.password) {
    if (data.password !== data.confirmPassword) {
      results.push({
        isValid: false,
        errors: ["konfirmasi password tidak sesuai"],
      });
    }
  }

  return Validator.combine(...results);
};
