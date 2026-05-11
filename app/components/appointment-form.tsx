"use client";

import { FormEvent, useState } from "react";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  organization: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

type ApiResponse = {
  error?: string;
  message?: string;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  organization: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export function AppointmentForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const raw = await response.text();
      let data: ApiResponse = {};

      if (raw) {
        try {
          data = JSON.parse(raw) as ApiResponse;
        } catch {
          throw new Error("预约接口返回了无法识别的内容，请检查服务端状态。");
        }
      }

      if (!response.ok) {
        throw new Error(data.error || `预约提交失败，状态码 ${response.status}。`);
      }

      setFeedback({
        type: "success",
        message: data.message || "预约提交成功。",
      });
      setForm(initialState);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "预约提交失败，请稍后再试。",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="appointment-form__grid">
        <label>
          <span>姓名</span>
          <input
            required
            name="fullName"
            value={form.fullName}
            onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
            placeholder="请输入您的姓名"
          />
        </label>

        <label>
          <span>手机号</span>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            placeholder="请输入联系电话"
          />
        </label>

        <label>
          <span>邮箱</span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="请输入常用邮箱"
          />
        </label>

        <label>
          <span>单位 / 机构</span>
          <input
            name="organization"
            value={form.organization}
            onChange={(event) =>
              setForm((current) => ({ ...current, organization: event.target.value }))
            }
            placeholder="可选填写"
          />
        </label>

        <label>
          <span>预约日期</span>
          <input
            type="date"
            name="preferredDate"
            value={form.preferredDate}
            onChange={(event) =>
              setForm((current) => ({ ...current, preferredDate: event.target.value }))
            }
          />
        </label>

        <label>
          <span>预约时间</span>
          <input
            type="time"
            name="preferredTime"
            value={form.preferredTime}
            onChange={(event) =>
              setForm((current) => ({ ...current, preferredTime: event.target.value }))
            }
          />
        </label>
      </div>

      <label className="appointment-form__full">
        <span>备注</span>
        <textarea
          name="message"
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          rows={5}
          placeholder="可填写合作方向、咨询内容或希望沟通的背景信息"
        />
      </label>

      <div className="appointment-form__actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "提交中..." : "提交预约"}
        </button>

        {feedback ? (
          <p className={`appointment-form__feedback appointment-form__feedback--${feedback.type}`}>
            {feedback.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
