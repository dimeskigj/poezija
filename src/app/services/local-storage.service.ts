import { Injectable } from '@angular/core';

export const HAS_SEEN_NOTICE = "has_seen_notice";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue !== null) {
        return JSON.parse(serializedValue) as T;
      }
    } catch (error) {
      console.error('Error retrieving from local storage:', error);
    }
    return null;
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from local storage:', error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  }
}
