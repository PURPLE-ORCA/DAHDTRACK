import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Transition } from '@headlessui/react';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, reset, errors, clearErrors, recentlySuccessful } = useForm({
        name: '',
        label: '',
        color: '',
    });

    const submitForm = (e) => {
        e.preventDefault();

        post(route('cours.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                router.reload({ only: ['cours'] });
            },
        });
    };

    const breadcrumbs = [
        {
            title: 'Courses list',
            href: '/cours',
        },
        {
            title: 'Add new cour',
            href: '/courses/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cours" />

            <div className="p-4">
                <Transition
                    show={recentlySuccessful}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="mb-4 rounded bg-green-500 p-2 text-center">
                        <p className="text-sm font-semibold text-white">Saved successfully!</p>
                    </div>
                </Transition>

                <h1 className="mb-6 text-2xl font-bold">Add New Cours</h1>

                <form className="space-y-6" onSubmit={submitForm}>
                    <div className="grid gap-2">
                        <Label required htmlFor="name">
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Name"
                            autoComplete="off"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label required htmlFor="label">
                            Label
                        </Label>
                        <Input
                            id="label"
                            name="label"
                            value={data.label}
                            onChange={(e) => setData('label', e.target.value)}
                            placeholder="Label"
                            autoComplete="off"
                        />
                        <InputError message={errors.label} />
                    </div>

                    <div className="grid gap-2">
                        <Label required htmlFor="color">
                            Color
                        </Label>
                        <Input
                            id="color"
                            name="color"
                            value={data.color}
                            onChange={(e) => setData('color', e.target.value)}
                            placeholder="Color"
                            autoComplete="off"
                        />
                        <InputError message={errors.color} />
                    </div>

                    <div>
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Add
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
