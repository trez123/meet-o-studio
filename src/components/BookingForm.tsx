'use client'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'
import { api, getTenantId } from '@/lib/api-client'
import {
  AvailabilityResponse,
  CategoryWithServices,
  Service,
} from '@/shared/sdk/chronos'
import { BaseAPIRequestFactory } from '@/shared/sdk/chronos/apis/baseapi'
import clsx from 'clsx'
import { FormEvent, useId, useState, useEffect } from 'react'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-meet-secondary/30 bg-transparent px-6 pb-4 pt-12 text-base/6 text-meet-secondary ring-4 ring-transparent transition focus:border-meet-secondary focus:outline-none focus:ring-meet-secondary/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-meet-secondary transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-meet-secondary peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-meet-secondary"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({
  label,
  description,
  price,
  duration,
  color,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string
  description?: string
  price?: string
  duration?: string
  color?: string
}) {
  return (
    <label
      className={clsx(
        'flex cursor-pointer gap-x-4 rounded-lg border-2 p-6 transition-all hover:scale-[1.02]',
        props.checked
          ? 'border-meet-secondary bg-meet-secondary/5'
          : 'border-gray-200',
      )}
      style={{ borderColor: props.checked ? color : undefined }}
    >
      <input
        type="radio"
        {...props}
        className="mt-1 h-6 w-6 flex-none appearance-none rounded-full border border-meet-primary/20 outline-none checked:border-[0.5rem] checked:border-meet-primary focus-visible:ring-1 focus-visible:ring-meet-primary focus-visible:ring-offset-2"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <span className="text-lg font-semibold text-meet-primary">
            {label}
          </span>
          {price && (
            <span className="text-xl font-bold text-meet-secondary">
              {price}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-meet-secondary">{description}</p>
        )}
        {duration && (
          <p className="mt-2 text-xs text-meet-secondary">{duration}</p>
        )}
      </div>
    </label>
  )
}

function DateButton({
  date,
  selected,
  onClick,
}: {
  date: Date
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-lg border p-3 text-center transition-all',
        selected
          ? 'border-meet-secondary bg-meet-secondary text-white'
          : 'border-gray-200 hover:border-meet-secondary hover:bg-meet-secondary/5',
      )}
    >
      <div className="text-xs uppercase">
        {date.toLocaleString('default', { month: 'short' })}
      </div>
      <div className="text-lg font-bold">{date.getDate()}</div>
      <div className="text-xs">
        {date.toLocaleString('default', { weekday: 'short' })}
      </div>
    </button>
  )
}

function TimeButton({
  time,
  selected,
  onClick,
}: {
  time: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-lg border p-3 text-center transition-all',
        selected
          ? 'border-meet-secondary bg-meet-secondary text-white'
          : 'border-gray-200 hover:border-meet-secondary hover:bg-meet-secondary/5',
      )}
    >
      {time.substring(0, 5)}
    </button>
  )
}
export function BookingForm() {
  const [step, setStep] = useState(1)
  const [isSuccess, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Data states
  const [categories, setCategories] = useState<CategoryWithServices[]>([])
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryWithServices | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
    generateAvailableDates()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await api.categories.getCategoriesWithServices()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const generateAvailableDates = () => {
    // Generate next 60 days, skipping Sundays
    const dates: Date[] = []
    const today = new Date()
    for (let i = 1; i <= 60; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      // Skip Sundays (0 = Sunday)
      if (date.getDay() !== 0) {
        dates.push(date)
      }
    }
    setAvailableDates(dates)
  }

  const checkAvailability = async (serviceId: number, date: Date) => {
    setIsLoading(true)
    try {
      const formattedDate = date.toISOString().split('T')[0]

      const result = await api.bookings.checkBookingAvailability({
        staffId: 1, // You might want to make this configurable
        date: formattedDate,
        serviceId: serviceId,
      })

      setAvailableTimes(result.availableSlots || [])
    } catch (error) {
      console.error('Availability check failed:', error)
      setAvailableTimes([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategorySelect = (category: CategoryWithServices) => {
    setSelectedCategory(category)
    setSelectedService(null) // Reset service selection
    // You could move to a sub-step or just show services in the same view
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    if (selectedService) {
      checkAvailability(selectedService.id, date)
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formattedDate = selectedDate?.toISOString().split('T')[0]
      await api.bookings.createBooking({
        serviceId: selectedService?.id || 0,
        bookingDate: formattedDate || '',
        bookingTime: selectedTime || '',
        notes: formData.notes,
        guestName: formData.name,
        guestEmail: formData.email,
        guestPhone: formData.phone || undefined,
        tenantId: parseInt(getTenantId()),
      })
      setSuccess(true)
      setStep(4)
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100)
  }

  const resetForm = () => {
    setStep(1)
    setSelectedCategory(null)
    setSelectedService(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setFormData({ name: '', email: '', phone: '', notes: '' })
    setSuccess(false)
  }

  const goBack = () => {
    if (step === 2) {
      setStep(1)
      setSelectedService(null)
    } else if (step === 3) {
      setStep(2)
    }
  }

  return (
    <FadeIn>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {['Select Category', 'Choose Time', 'Your Details', 'Confirm'].map(
            (label, i) => (
              <div className="flex flex-1 last:flex-none" key={label}>
                <div
                  key={label}
                  className="flex flex-col items-center last:w-auto"
                >
                  <div
                    className={clsx(
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                      step > i + 1
                        ? 'bg-meet-secondary text-white'
                        : step === i + 1
                          ? 'bg-meet-secondary text-white ring-4 ring-meet-secondary/20'
                          : 'bg-gray-100 text-gray-400',
                    )}
                  >
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <p
                    className={clsx(
                      'mt-2 text-sm ',
                      step === i + 1 ? 'text-meet-secondary' : 'text-gray-400',
                    )}
                  >
                    {label}
                  </p>
                </div>
                {i < 3 && (
                  <div
                    className={clsx(
                      'mx-2 mt-4 h-1 flex-1',
                      step > i + 1 ? 'bg-meet-secondary' : 'bg-gray-200',
                    )}
                  />
                )}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Step 1: Category & Service Selection */}
      {step === 1 && (
        <div>
          <h2 className="mb-6 text-center font-display text-2xl font-semibold text-meet-primary">
            Select a Category
          </h2>

          {categories.length === 0 ? (
            <p className="py-8 text-center text-meet-secondary/60">
              Loading categories...
            </p>
          ) : (
            <div className="space-y-8">
              {categories.map((category) => (
                <div key={category.id} className="space-y-4">
                  {/* Category Header */}
                  <CategoryListItem
                    title={category.name}
                    description={category.description || ''}
                    category={category}
                    selectedService={selectedService}
                    handleServiceSelect={handleServiceSelect}
                    formatPrice={formatPrice}
                  />
                </div>
              ))}
            </div>
          )}
          {selectedService && (
            <div className="flex">
              <Button
                className={clsx(
                  'mx-auto mt-10 bg-green-600 px-6 transition delay-500 duration-500 ease-in-out',
                )}
                onClick={() => setStep(2)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Date & Time Selection */}
      {step === 2 && selectedService && (
        <div>
          <div className="mb-6">
            <h2 className="font-display text-2xl font-semibold text-meet-primary">
              Select Date & Time
            </h2>
            <p className="mt-1 text-sm text-meet-secondary/70">
              {selectedService.name} • {selectedService.durationMinutes} minutes
            </p>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="mb-3 font-medium text-meet-primary">
              Select a Date
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {availableDates.map((date) => (
                <DateButton
                  key={date.toISOString()}
                  date={date}
                  selected={
                    selectedDate?.toDateString() === date.toDateString()
                  }
                  onClick={() => handleDateSelect(date)}
                />
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h3 className="mb-3 font-medium text-meet-primary">
                Available Times for{' '}
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              {isLoading ? (
                <div className="py-8 text-center text-meet-secondary/60">
                  Checking availability...
                </div>
              ) : availableTimes.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {availableTimes.map((time) => (
                    <TimeButton
                      key={time}
                      time={time}
                      selected={selectedTime === time}
                      onClick={() => handleTimeSelect(time)}
                    />
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-meet-secondary/60">
                  No available times for this date. Please select another date.
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              onClick={goBack}
              className="bg-gray-200 text-meet-primary hover:bg-gray-300"
            >
              Back
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Client Details */}
      {step === 3 && selectedService && selectedDate && selectedTime && (
        <div>
          <h2 className="mb-6 font-display text-2xl font-semibold text-meet-primary">
            Your Information
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="isolate mb-6 -space-y-px rounded-2xl bg-white/50">
              <TextInput
                label="Full Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Phone (optional)"
                type="tel"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <TextInput
                label="Special Requests or Notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>

            {/* Booking Summary */}
            <Border className="mb-6 p-6">
              <h3 className="mb-3 font-semibold text-meet-primary">
                Booking Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-meet-secondary/70">Service:</span>
                  <span className="font-medium text-meet-primary">
                    {selectedService.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-meet-secondary/70">Date:</span>
                  <span className="text-meet-primary">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-meet-secondary/70">Time:</span>
                  <span className="text-meet-primary">
                    {selectedTime.substring(0, 5)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-meet-secondary/70">Duration:</span>
                  <span className="text-meet-primary">
                    {selectedService.durationMinutes} minutes
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold text-meet-primary">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-meet-secondary">
                    {formatPrice(
                      selectedService.priceCents,
                      selectedService.currency,
                    )}
                  </span>
                </div>
              </div>
            </Border>

            <div className="flex justify-between gap-4">
              <Button
                type="button"
                onClick={goBack}
                className="flex-1 bg-gray-200 text-meet-primary hover:bg-gray-300"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className={clsx(
                  'flex-1 transition-all',
                  isSuccess ? 'bg-green-500' : 'bg-meet-secondary',
                )}
              >
                {isLoading ? (
                  'Processing...'
                ) : isSuccess ? (
                  <svg
                    className="mx-auto h-5 w-5 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && isSuccess && (
        <div className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-2 font-display text-2xl font-semibold text-meet-primary">
            Booking Confirmed!
          </h2>
          <p className="mb-8 text-meet-secondary/70">
            We've sent a confirmation email to {formData.email} with all the
            details.
          </p>
          <Button onClick={resetForm} className="bg-meet-secondary">
            Book Another Session
          </Button>
        </div>
      )}
    </FadeIn>
  )
}

function CategoryListItem({
  title,
  description,
  category,
  selectedService,
  handleServiceSelect,
  formatPrice,
}: {
  title: string
  description?: string
  category: CategoryWithServices
  selectedService: Service | null
  handleServiceSelect: (service: Service) => void
  formatPrice: (cents: number, currency: string) => string
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <FadeIn>
        <Border />
        <div>
          <div className="flex items-center justify-between">
            <div className="flex w-3/4 items-center gap-x-2">
              <p className="my-5 text-xl font-bold text-meet-secondary">
                {title}
              </p>
              {description && (
                <p className="text-sm text-meet-secondary/60">{description}</p>
              )}
            </div>
            <Button
              className={clsx(
                'px-6 transition delay-500 duration-500 ease-in-out',
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {' '}
              {isOpen ? 'Selected' : 'Select'}{' '}
            </Button>
          </div>
          <div
            className={`delay-80 overflow-hidden text-xl text-meet-secondary transition-all duration-500 ease-in-out ${isOpen ? 'mb-5 max-h-screen' : 'max-h-0 '}`}
          >
            <div className="mx-4 mt-4 space-y-4">
              {category.services.map((service) => (
                <RadioInput
                  key={service.id}
                  name="service"
                  label={service.name}
                  description={service.description || undefined}
                  price={formatPrice(service.priceCents, service.currency)}
                  duration={`${service.durationMinutes} minutes`}
                  checked={selectedService?.id === service.id}
                  onChange={() => handleServiceSelect(service)}
                />
              ))}
            </div>
          </div>
        </div>
        <Border />
      </FadeIn>
    </>
  )
}
